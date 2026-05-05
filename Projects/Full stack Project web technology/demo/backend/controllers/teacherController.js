const pool = require('../config/db');

// ======================== TEACHER CONTROLLER ========================

// Get all labs created by teacher
exports.getTeacherLabs = async (req, res) => {
  try {
    const { teacher_id } = req.params;

    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM labs WHERE teacher_id = ? ORDER BY lab_id DESC',
      [teacher_id]
    );
    conn.release();

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get teacher labs error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new lab with automatic student assignment and practical creation
exports.createLab = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { teacher_id, lab_name, branch, year, division } = req.body;

    if (!teacher_id || !lab_name || !branch || !year || !division) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    // Begin transaction
    await conn.beginTransaction();

    // Step 1: Create lab
    const [labResult] = await conn.query(
      'INSERT INTO labs (lab_name, teacher_id, branch, year, division) VALUES (?, ?, ?, ?, ?)',
      [lab_name, teacher_id, branch, year, division]
    );
    const lab_id = labResult.insertId;

    // Step 2: Get all students matching branch, year, division
    const [students] = await conn.query(
      'SELECT student_id FROM students WHERE branch = ? AND year = ? AND division = ?',
      [branch, year, division]
    );

    // Step 3: Assign students to lab
    for (const student of students) {
      await conn.query(
        'INSERT INTO student_labs (student_id, lab_id) VALUES (?, ?)',
        [student.student_id, lab_id]
      );
    }

    // Step 4: Create 12 practicals for this lab
    for (let i = 1; i <= 12; i++) {
      await conn.query(
        'INSERT INTO practicals (lab_id, practical_no) VALUES (?, ?)',
        [lab_id, i]
      );
    }

    // Step 5: Create student_practical_status for all students and practicals
    const [practicals] = await conn.query(
      'SELECT practical_id FROM practicals WHERE lab_id = ?',
      [lab_id]
    );

    for (const student of students) {
      for (const practical of practicals) {
        await conn.query(
          'INSERT INTO student_practical_status (student_id, practical_id) VALUES (?, ?)',
          [student.student_id, practical.practical_id]
        );
      }
    }

    // Commit transaction
    await conn.commit();
    conn.release();

    res.json({
      success: true,
      message: 'Lab created successfully with students and practicals',
      lab_id: lab_id,
      students_assigned: students.length
    });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error('Create lab error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get students in a lab with their practicals and evaluations
exports.getLabStudents = async (req, res) => {
  try {
    const { lab_id } = req.params;

    const conn = await pool.getConnection();

    // Get all students in lab
    const [studentRows] = await conn.query(`
      SELECT s.student_id, s.prn, s.full_name
      FROM student_labs sl
      JOIN students s ON sl.student_id = s.student_id
      WHERE sl.lab_id = ?
      ORDER BY s.student_id
    `, [lab_id]);

    // For each student, get their practicals
    const students = [];
    for (const student of studentRows) {
      // Get practicals for this student
      const [practicals] = await conn.query(`
        SELECT 
          sp.status_id,
          p.practical_id,
          p.practical_no,
          sp.completed,
          sp.marks,
          sp.attendance
        FROM student_practical_status sp
        JOIN practicals p ON sp.practical_id = p.practical_id
        WHERE sp.student_id = ? AND p.lab_id = ?
        ORDER BY p.practical_no
      `, [student.student_id, lab_id]);

      students.push({
        ...student,
        practicals: practicals
      });
    }

    conn.release();

    res.json({ success: true, data: students });
  } catch (error) {
    console.error('Get lab students error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student practical status (marks, attendance, completion)
exports.updatePracticalStatus = async (req, res) => {
  try {
    const { status_id, completed, marks, attendance } = req.body;

    if (!status_id || marks === undefined || completed === undefined || attendance === undefined) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    // Validate marks (0-10)
    if (marks < 0 || marks > 10) {
      return res.status(400).json({ success: false, message: 'Marks must be between 0 and 10' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE student_practical_status SET completed = ?, marks = ?, attendance = ? WHERE status_id = ?',
      [completed ? 1 : 0, marks, attendance ? 1 : 0, status_id]
    );
    conn.release();

    res.json({ success: true, message: 'Practical status updated successfully' });
  } catch (error) {
    console.error('Update practical status error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Batch update student practical statuses
exports.updatePracticalStatusBatch = async (req, res) => {
  let conn = null;
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Updates array is required' });
    }

    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const update of updates) {
      const { status_id, completed, marks, attendance } = update;

      if (!status_id || marks === undefined || completed === undefined || attendance === undefined) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ success: false, message: 'All fields are required for each update' });
      }

      if (marks < 0 || marks > 10) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ success: false, message: 'Marks must be between 0 and 10' });
      }

      await conn.query(
        'UPDATE student_practical_status SET completed = ?, marks = ?, attendance = ? WHERE status_id = ?',
        [completed ? 1 : 0, marks, attendance ? 1 : 0, status_id]
      );
    }

    await conn.commit();
    conn.release();

    res.json({ success: true, message: 'Practical statuses updated successfully', count: updates.length });
  } catch (error) {
    console.error('Batch update practical status error:', error);
    if (conn && conn.rollback) {
      await conn.rollback();
      conn.release();
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get lab summary
exports.getLabSummary = async (req, res) => {
  try {
    const { lab_id } = req.params;

    const conn = await pool.getConnection();
    const [summary] = await conn.query(`
      SELECT 
        COUNT(DISTINCT sl.student_id) as total_students,
        COUNT(DISTINCT p.practical_id) as total_practicals,
        SUM(CASE WHEN sp.completed = TRUE THEN 1 ELSE 0 END) as total_completed,
        AVG(sp.marks) as average_marks
      FROM student_labs sl
      LEFT JOIN practicals p ON p.lab_id = ?
      LEFT JOIN student_practical_status sp ON sp.practical_id = p.practical_id
      WHERE sl.lab_id = ?
    `, [lab_id, lab_id]);
    
    conn.release();

    res.json({ success: true, data: summary[0] });
  } catch (error) {
    console.error('Get lab summary error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
