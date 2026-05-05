// Simple array of objects
var students = [
    { name: "Aditya Suryakar", age: 20, grade: "A" },
    { name: "Satyajeet Patil", age: 22, grade: "B" },
    { name: "Varad Sonad", age: 21, grade: "C" },
    { name: "Yash Patil", age: 23, grade: "A" }
];

console.log(students[0].name);
console.log(students[1].age);
console.log(students[2].grade);

for (var i = 0; i < students.length; i++) {
    console.log(students[i].name + " is " + students[i].age + " years old and has grade " + students[i].grade);
}


// Express server
const express = require('express');
const app = express();
const port = 3000;

// Array of student objects
const studentsData = [
    { name: "Aditya Suryakar", age: 20, email: "aditya@example.com" },
    { name: "Satyajeet Patil", age: 22, email: "satyajeet@example.com" },
    { name: "Varad Sonad", age: 21, email: "varad@example.com" },
    { name: "Yash Patil", age: 23, email: "yash@example.com" }
];

// Home route
app.get('/', (req, res) => {
    res.send("Welcome Aditya !!!")
});

// Route to get all students
app.get('/students', (req, res) => {
    res.json(studentsData);
});

// Dynamic route
app.get('/student/:name', (req, res) => {
    const name = req.params.name;
    const student = studentsData.find(s => s.name.toLowerCase() === name.toLowerCase());

    if (student) {
        res.json(student);
    } else {
        res.send("Student not found");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});