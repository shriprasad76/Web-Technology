// node js:- it is run time envirnment that leads run javscript on server side 
//            - bilt on chrome v8 engine
//            - use to creaate fast and scaleble web application 

// express js:- it is minimal and flexible web framework for node js 
//            - it helps handle roots and middle wair and http request and response
//             -make the fats backend
//             -why use express js:- simplifies server creation in node js and provides a robust set of features for web and mobile applications
//             offers pourful offers like routing ,middleware,staic file serving and template
// npm:-node package manager is a package manager for the JavaScript programming language
//     used to install and manage packages or modules for node js applications
//     every node project use package.json to manage dependencies
//     step 1:-open new terminal
//     step 2:-npm init/npm init -y
//     step 3:-npm install express
// differ package.json and package-lock.json:-
// package.json:- it is a file that contains metadata about the project and its dependencies
//                it lists the packages that the project depends on and their versions
// package-lock.json:- it is a file that is automatically generated when you install packages using npm
//                    it locks the versions of the installed packages to ensure consistent installations across different environments
// what is use of dev dependencies and dependenciesconst express = require('express')
const express = require("express");
const app = express();
const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>Hello Digvijay 👋</h1><p>Server running on localhost:3000</p>");
});

// Another Route
app.get("/about", (req, res) => {
    res.send("<h2>This is About Page</h2>");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//