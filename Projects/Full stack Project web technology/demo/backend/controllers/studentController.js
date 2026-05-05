const pool = require('../config/db');

// ======================== STUDENT CONTROLLER ========================

// Get all labs assigned to student
exports.getStudentLabs = async (req, res) => {
  try {
    const { student_id } = req.params;

    const conn = await pool.getConnection();
    const [rows] = await conn.query(`
      SELECT l.*
      FROM student_labs sl
      JOIN labs l ON sl.lab_id = l.lab_id
      WHERE sl.student_id = ?
      ORDER BY l.lab_id DESC
    `, [student_id]);
    
    conn.release();

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get student labs error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student practicals for a lab with their status
exports.getStudentPracticals = async (req, res) => {
  try {
    const { student_id, lab_id } = req.params;

    const conn = await pool.getConnection();
    
    // Get student info
    const [studentInfo] = await conn.query(
      'SELECT student_id, prn, full_name FROM students WHERE student_id = ?',
      [student_id]
    );

    // Get practicals
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
    `, [student_id, lab_id]);

    // Calculate summary
    const totalCompleted = practicals.filter(p => p.completed).length;
    const totalMarks = practicals.reduce((sum, p) => sum + p.marks, 0);
    const totalAttendance = practicals.filter(p => p.attendance).length;

    conn.release();

    res.json({
      success: true,
      student: studentInfo[0],
      practicals: practicals,
      summary: {
        total_practicals: practicals.length,
        completed_practicals: totalCompleted,
        total_marks: totalMarks,
        total_attendance: totalAttendance
      }
    });
  } catch (error) {
    console.error('Get student practicals error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student summary for all labs
exports.getStudentSummary = async (req, res) => {
  try {
    const { student_id } = req.params;

    const conn = await pool.getConnection();
    
    // Get student info
    const [studentInfo] = await conn.query(
      'SELECT student_id, prn, full_name, branch, year, division FROM students WHERE student_id = ?',
      [student_id]
    );

    if (studentInfo.length === 0) {
      conn.release();
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Get all labs and their summary
    const [labSummaries] = await conn.query(`
      SELECT 
        l.lab_id,
        l.lab_name,
        t.name as teacher_name,
        COUNT(DISTINCT p.practical_id) as total_practicals,
        COUNT(CASE WHEN sp.completed = TRUE THEN 1 END) as completed_practicals,
        SUM(sp.marks) as total_marks,
        COUNT(CASE WHEN sp.attendance = TRUE THEN 1 END) as total_attendance
      FROM student_labs sl
      JOIN labs l ON sl.lab_id = l.lab_id
      JOIN teachers t ON l.teacher_id = t.teacher_id
      LEFT JOIN practicals p ON p.lab_id = l.lab_id
      LEFT JOIN student_practical_status sp ON sp.practical_id = p.practical_id AND sp.student_id = ?
      WHERE sl.student_id = ?
      GROUP BY l.lab_id
      ORDER BY l.lab_id DESC
    `, [student_id, student_id]);

    conn.release();

    res.json({
      success: true,
      student: studentInfo[0],
      labs: labSummaries
    });
  } catch (error) {
    console.error('Get student summary error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
