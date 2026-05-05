const pool = require('../config/db');

// ======================== AUTH CONTROLLER ========================

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM admin WHERE username = ?', [username]);
    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // For demo: Simple password comparison (in production use bcrypt)
    if (rows[0].password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Admin login successful', admin_id: rows[0].admin_id });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Teacher Sign Up
exports.teacherSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const conn = await pool.getConnection();
    
    // Check if email already exists
    const [existing] = await conn.query('SELECT * FROM teachers WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      conn.release();
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Insert new teacher
    const [result] = await conn.query(
      'INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    conn.release();

    res.json({ 
      success: true, 
      message: 'Teacher account created successfully! Please login with your credentials.',
      teacher_id: result.insertId 
    });
  } catch (error) {
    console.error('Teacher signup error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Teacher Login
exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM teachers WHERE email = ?', [email]);
    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (rows[0].password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Teacher login successful', teacher_id: rows[0].teacher_id, name: rows[0].name });
  } catch (error) {
    console.error('Teacher login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student Sign Up
exports.studentSignUp = async (req, res) => {
  try {
    const { full_name, prn, branch, year, division } = req.body;
    const password = req.body.password || '';

    if (!full_name || !prn) {
      return res.status(400).json({ success: false, message: 'Full name and PRN required' });
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters' });
    }

    const conn = await pool.getConnection();
    const [existing] = await conn.query('SELECT * FROM students WHERE prn = ?', [prn]);

    if (existing.length > 0) {
      conn.release();
      return res.status(400).json({ success: false, message: 'PRN already registered' });
    }

    const [result] = await conn.query(
      'INSERT INTO students (prn, full_name, branch, year, division) VALUES (?, ?, ?, ?, ?)',
      [prn, full_name, branch || null, year || null, division || null]
    );
    conn.release();

    // In this demo, password is not persisted in DB; login uses PRN or student123
    res.json({
      success: true,
      message: 'Student account created successfully! Use your PRN in login. (Password is PRN or student123).',
      student_id: result.insertId
    });
  } catch (error) {
    console.error('Student signup error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'PRN already registered' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student Login (using PRN)
exports.studentLogin = async (req, res) => {
  try {
    const { prn, password } = req.body;
    
    if (!prn || !password) {
      return res.status(400).json({ success: false, message: 'PRN and password required' });
    }

    // For demo, use PRN and a simple password
    // In real scenario, you might store hashed passwords
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM students WHERE prn = ?', [prn]);
    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid PRN' });
    }

    // Simple validation (password = prn for demo)
    if (password !== prn && password !== 'student123') {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.json({ 
      success: true, 
      message: 'Student login successful', 
      student_id: rows[0].student_id, 
      full_name: rows[0].full_name,
      prn: rows[0].prn
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
