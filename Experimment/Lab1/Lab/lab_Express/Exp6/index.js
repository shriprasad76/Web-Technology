const express = require('express');
const app = express();
const port = 3000;

const users = [
    { id: 1, name: "Rahul", age: 20,department:"IT" },
    { id: 2, name: "Amit", age: 22,department:"CS" },
    { id: 3, name: "Sneha", age: 21,department:"MECH"}
];

app.get('/', (req, res) => {
  res.send('This is Experiment 6th Home page!');
}); 


app.get("/user/:department", (req, res) => {

    const department = (req.params.department);
    const user = users.find(u => u.department === department);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.json(user);
});

app.get("/user", (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 


// whatis middle ware:-
//middleware is a function that has access to the request object (req), the response object (res), and the next middleware function that runs before sending response;
/*it can check data , log info , authenticate user 
syntax :- */

app.use((req,res,next)=>{
    console.log('request recives,new date');
    next(); // to move to the next middleware or route handler
})

/* activiteis 
where we use middle ware
why we sue middleware
in companies level where we use middle ware and why??


next() next passes to the next fucntion 
if not next() request will hang and never send response

*/