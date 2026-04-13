// 2. Arrow function example
const add = (a, b) => {
    console.log("Addition is " + (a + b));
};

const square = x => x * x;

add(3, 4);
console.log(square(5));


// 3. Switch case
let a = 10;
let b = 20;
let ch = 2;

console.log("1.Addition\n2.Subtraction\n3.Multiplication\n4.Division");

switch (ch) {
    case 1:
        console.log("Addition is: " + (a + b));
        break;
    case 2:
        console.log("Subtraction is: " + (a - b));
        break;
    case 3:
        console.log("Multiplication is: " + (a * b));
        break;
    case 4:
        console.log("Division is: " + (a / b));
        break;
    default:
        console.log("Invalid choice");
}


// 4. Truthy and Falsy values
let values = [0, 1, "", "Hello", null, undefined, [], {}, NaN];

for (let i = 0; i < values.length; i++) {
    if (values[i]) {
        console.log(values[i] + " -> Truthy");
    } else {
        console.log(values[i] + " -> Falsy");
    }
}


// 6. Loops in array
let arr = [10, 20, 30, 40, 50];

// for loop
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// while loop
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}

// do while loop
i = 0;
do {
    console.log(arr[i]);
    i++;
} while (i < arr.length);

// for of
for (let val of arr) {
    console.log(val);
}

// for in
for (let index in arr) {
    console.log(arr[index]);
}

// forEach
arr.forEach(e => console.log(e));


// 7. map and filter
let nums = [1, 2, 3, 4, 5];

let doubled = nums.map(n => n * 2);
console.log("Doubled:", doubled);

let even = nums.filter(n => n % 2 === 0);
console.log("Even:", even);