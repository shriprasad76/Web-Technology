const pool = require('../config/db');

// ======================== ADMIN CONTROLLER ========================

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM students ORDER BY student_id DESC');
    conn.release();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new student
exports.addStudent = async (req, res) => {
  try {
    const { prn, full_name, branch, year, division } = req.body;

    if (!prn || !full_name || !branch || !year || !division) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO students (prn, full_name, branch, year, division) VALUES (?, ?, ?, ?, ?)',
      [prn, full_name, branch, year, division]
    );
    conn.release();

    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error('Add student error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'PRN already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { student_id, full_name, branch, year, division } = req.body;

    if (!student_id || !full_name || !branch || !year || !division) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE students SET full_name = ?, branch = ?, year = ?, division = ? WHERE student_id = ?',
      [full_name, branch, year, division, student_id]
    );
    conn.release();

    res.json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.body;

    const conn = await pool.getConnection();
    await conn.query('DELETE FROM students WHERE student_id = ?', [student_id]);
    conn.release();

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT teacher_id, name, email FROM teachers ORDER BY teacher_id DESC');
    conn.release();
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    conn.release();

    res.json({ success: true, message: 'Teacher added successfully' });
  } catch (error) {
    console.error('Add teacher error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { teacher_id, name, email, password } = req.body;

    if (!teacher_id || !name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE teachers SET name = ?, email = ?, password = ? WHERE teacher_id = ?',
      [name, email, password, teacher_id]
    );
    conn.release();

    res.json({ success: true, message: 'Teacher updated successfully' });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { teacher_id } = req.body;

    const conn = await pool.getConnection();
    await conn.query('DELETE FROM teachers WHERE teacher_id = ?', [teacher_id]);
    conn.release();

    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
