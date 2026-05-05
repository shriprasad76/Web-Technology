const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

let connection;

(async () => {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'manager',
            database: 'student_management'
        });
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        process.exit(1);
    }
})();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/students', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM students');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Database error' });
    }
});

app.get('/students/:id', async (req, res) => {
  const studentId = Number(req.params.id);
  try {
    const [rows] = await connection.execute('SELECT * FROM students WHERE id = ?', [studentId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.post('/students', async (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined) {
    return res.status(400).json({ message: 'Name and marks are required' });
  }

  try {
    const [result] = await connection.execute('INSERT INTO students (name, marks) VALUES (?, ?)', [name.trim(), Number(marks)]);
    const student = {
      id: result.insertId,
      name: name.trim(),
      marks: Number(marks)
    };
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.put('/students/:id', async (req, res) => {
  const studentId = Number(req.params.id);
  const { marks } = req.body;
  if (marks === undefined) {
    return res.status(400).json({ message: 'Marks are required to update' });
  }

  try {
    const [result] = await connection.execute('UPDATE students SET marks = ? WHERE id = ?', [Number(marks), studentId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ id: studentId, marks: Number(marks) });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.delete('/students/:id', async (req, res) => {
  const studentId = Number(req.params.id);
  try {
    const [result] = await connection.execute('DELETE FROM students WHERE id = ?', [studentId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Student Evaluation System server running on http://localhost:${port}`);
});
