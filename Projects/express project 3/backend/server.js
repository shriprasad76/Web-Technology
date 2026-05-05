const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

let students = [];
let nextId = 1;

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined) {
    return res.status(400).json({ message: 'Name and marks are required' });
  }

  const student = {
    id: nextId++,
    name: name.trim(),
    marks: Number(marks)
  };

  students.push(student);
  res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const { marks } = req.body;
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  if (marks === undefined) {
    return res.status(400).json({ message: 'Marks are required to update' });
  }

  student.marks = Number(marks);
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.json(deletedStudent);
});

app.listen(port, () => {
  console.log(`Student Evaluation System server running on http://localhost:${port}`);
});
