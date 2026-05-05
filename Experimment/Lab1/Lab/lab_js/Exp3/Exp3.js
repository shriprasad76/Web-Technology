/*
1.diff between arrow fn. and simple fn.
2.this keyword why we use this in simple fn. and arrow function if not  why??
3.write code for two arrow functions with two examples
4. write code for switch case in js
5.how to use truthy and falsy values in js
6.how to use ternary operator in js
7.write a code for how to use loops in array for
8.diff between for-in and for-of 
9.how to use filter and map function in js
10.how to use reduce method or function in js
*/

//Activity 1 :- Difference between simple function and arrow function
document.writeln("<b>Activity 1:</b><br>");

//simple function
function simplefn() {
    document.writeln("This is the simple function<br>");
}
simplefn();

//arrow function
const arrowfn = () => {
    document.writeln("This is the Arrow function<br>");
}

//short arrow function
const arrowFn1 = () => document.writeln("This is also arrow function<br>");

arrowfn();
arrowFn1();
document.writeln("<br>");

//Activity 2 :- this keyword explanation
document.writeln("<b>Activity 2:</b><br>");

const obj1 = {
    name: "Digvijay",
    simple: function () {
        document.writeln("Simple function this.name: " + this.name + "<br>");
    },
    arrow: () => {
        document.writeln("Arrow function this.name: undefined<br>");
    }
};

obj1.simple();
obj1.arrow();

document.writeln("Note: 'this' works in simple function but not in arrow function<br><br>");


//Activity 3 :- Arrow function examples
document.writeln("<b>Activity 3:</b><br>");

const add = (a, b) => a + b;
document.writeln("Sum is: " + add(5, 10) + "<br>");

const mul = a => a * 2;
document.writeln("Multiplication is: " + mul(7) + "<br><br>");

//Activity 4 :- Switch case
document.writeln("<b>Activity 4:</b><br>");

switch(5){
    case 1:
        document.writeln("Value is 1<br>");
        break;
    case 2:
        document.writeln("Value is 2<br>");
        break;
    case 3:
        document.writeln("Value is 3<br>");
        break;
    default :
        document.writeln("Value is Default<br>");
}
document.writeln("<br>");

//Activity 5 :- Truthy and Falsy values
document.writeln("<b>Activity 5:</b><br>");

let a = 5;
if(a) document.writeln("a is truthy value<br>");
else document.writeln("a is falsy value<br>");

//these values are truthy values(2,-1,true,"abc",[],{},function(){})
//1. non zero numbers 
//2. non empty strings
//3. objects
//4. arrays
//5. true

let b = 0;
if(b) document.writeln("b is truthy value<br>");
else document.writeln("b is falsy value<br>");

document.writeln("Truthy: non-zero, non-empty string, objects, arrays<br>");
document.writeln("Falsy: 0, '', null, undefined, NaN, false<br><br>");


//Activity 6 :- Ternary Operator
document.writeln("<b>Activity 6:</b><br>");
let age = 18;
(age >= 18) ? document.writeln("adult person<br>") : document.writeln("not a adult person<br>");

//Activity 7 :- Loops in array
document.writeln("<b>Activity 7:</b><br>");

let arr = [1,2,3,4,5];

//for loop
for(let i=0;i<arr.length;i++){
    document.writeln("for loop: " + arr[i] + "<br>");
}

//for-in loop
for(let index in arr){
    document.writeln("for-in loop: " + arr[index] + "<br>");
}

//for-of loop
for(let value of arr){
    document.writeln("for-of loop: " + value + "<br>");
}

//forEach loop
arr.forEach((value) => {
    document.writeln("forEach loop: " + value + "<br>");
});

document.writeln("<br>");


//Activity 8 :- Difference for-in and for-of
document.writeln("<b>Activity 8:</b><br>");

document.writeln("for-in: gives index<br>");
document.writeln("for-of: gives value<br><br>");
//for-in loop is used to iterate over the properties of an object and gives index of array
//for-of loop is used to iterate over the values of an iterable object like array and gives value of array

//Activity 9 :- filter and map
document.writeln("<b>Activity 9:</b><br>");

let array = [1,2,3,4,5];

let filteredArray = array.filter(e => e%2 == 0);
document.writeln("Filtered (even numbers): " + filteredArray + "<br>");

let mappedArray = array.map(e => e*2);
document.writeln("Mapped (double values): " + mappedArray + "<br><br>");


//Activity 10 :- reduce
document.writeln("<b>Activity 10:</b><br>");

let sumOfArray = array.reduce((total, current) => total + current, 0);
document.writeln("Sum of array: " + sumOfArray + "<br>");




