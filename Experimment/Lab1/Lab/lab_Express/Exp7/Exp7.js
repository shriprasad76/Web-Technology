const express = require("express");
const app = express();

const PORT = 3000;

// Sample Data
const users = [
    { id: 1, name: "Rahul", age: 20 },
    { id: 2, name: "Amit", age: 22 },
    { id: 3, name: "Sneha", age: 21 }
];
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to Home page of 7th Exp");
});

app.get("/user/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.json(user);
});

app.get("/user", (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});