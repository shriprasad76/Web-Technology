
console.log("Hello JavaScript");

let num = 5;

if (num > 0) {
    console.log("Number is Positive");
} else if (num < 0) {
    console.log("Number is Negative");
} else {
    console.log("Number is Zero");
}

if (num % 2 === 0) {
    console.log("Even Number");
} else {
    console.log("Odd Number");
}


console.log("For loop");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}



console.log("While loop");
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}


console.log("Do-While loop");
let j = 1;
do {
    console.log(j);
    j++;
} while (j <= 5);


console.log("Even numbers between 1 and 10");
for (let k = 1; k <= 10; k++) {
    if (k % 2 === 0) {
        console.log(k);
    }
}


for (let m = 1; m <= 5; m++) {
    console.log("Number is: " + m);
}


