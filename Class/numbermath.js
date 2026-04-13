// let number = new Number(123)
// console.log(number)

console.log(number.toString())
console.log(number.len())
console.log(number.toFixed());   // when we write build e-commerce website and decision value

// number is a object type
let h = 10000000;
console.log(h.toLocaleString('en-IN'))

// Math
console.log(Math)
console.log(Math.abs(-4));   // when we take -ve value its converted to +ve value, but +ve value remains
console.log(Math.round(4.6))
console.log(Math.ceil(4.6))
console.log(Math.floor(4.6))
console.log(Math.min(1,2,3,4,5))
console.log(Math.max(1,2,3,4,5))

// HOME ACTIVITY: learn about math.random
// -> math.random is a function that provides a random number between 0 and 1.
// Random number between 1 and 10
let num = Math.floor(Math.random() * 10) + 1;
console.log(num);