//var is a old way to declare variables
//Function scoped
//Can be re-declared and updated
var a = 10;
var a = 20;   // allowed
a = 30;       // allowed


// let is  modern way to declare variables
// Block scoped
// Cannot be re-declared but can be updated
let b = 40;
// let b = 50; // not allowed
b = 60;       // allowed

// const is used to declare constant values
// Block scoped
// Cannot be re-declared or updated
const c = 70;
// c = 80;    // not allowed



// Types of Data
// 1. Primitive Data Types
// These store single values

let numberType = 104;        // number
let stringType = "Shri";   // string
let booleanType = true;     // boolean
let nullType = null;        // null
let undefinedType;          // undefined
let symbolType = Symbol();  // symbol
let bigIntType = 104n;      // bigint


// 2. Non-Primitive Data Types
// These store multiple values or complex data

let objectType = { name: "Shri", age: 21 }; // object
let arrayType = [1, 2, 3, 4];              // array
let functionType = function () {           // function
  return "Hello";
};



// Variable Declaration and typeof Operator
let aa = 104;
let ab = "Shri";
let ac = false;
let ad = null;
let ae;

console.log(typeof aa); // number
console.log(typeof ab); // string
console.log(typeof ac); // boolean
console.log(typeof ad); // object (this is a known JavaScript behavior)
console.log(typeof ae); // undefined


// Difference between null and undefined

// null represents intentional absence of value
// Value is assigned manually
let m = null;
console.log(m);          // null
console.log(typeof m);   // object

// undefined means variable declared but value not assigned
let n;
console.log(n);          // undefined
console.log(typeof n);   // undefined
