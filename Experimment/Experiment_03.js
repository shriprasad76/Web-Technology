/*
Activity
1.Difference in arrow function and simple function
  - Are we use this keyword ? why?
2.Write a code with arrow function with example
3.switch case
4.truety and falsy values with example
5.for of and for in difference
6.how to use lopps in array
7.filter and map function in java script

*/
//2.Write a code with arrow function with example

const add = (a, b) => {
    console.log("Addition is " + (a + b));
};

const square = (x) => x * x;

add(3, 4);                 
console.log(square(5));     


//3.switch case
let a=10;
let b=20;
let ch=2;
console.log("1.Addition\n2.Subtraction\n3.Multiplication\n4.Division");
switch (ch) {
    case "1":
        console.log("Addition is:"+(parseInt(a)+parseInt(b)));
        break;
    case "2":
        console.log("Subtraction is:"+(parseInt(a)-parseInt(b)));
        break;
    case "3":
        console.log("Multiplication is:"+(parseInt(a)*parseInt(b)));
        break;
    case "4":
        console.log("Division is:"+(parseInt(a)/parseInt(b)));
        break;
    default:
        console.log("Invalid choice");
}

//4.truety and falsy values with example
let values = [0, 1, "", "Hello", null, undefined, [], {}, NaN];
for(let i=0;i<values.length;i++)
{
    if(values)
    {
        console.log("Truely");
        
    }
    else
    {
        console.log("Falsy");
    }
}

//loops in js
let arr=[10,20,30,40,50];
let i=0;
//for loop
for(i=0;i<arr.length;i++)
{
    console.log(arr[i]);
}

//while loop
i=0;
while(i<arr.length)
{
    console.log(arr[i]);
    i++;
}

//do while loop
i=0;
do{
    console.log(arr[i]);
    i++;
}while(i<arr.length);

//for of loop
for(let val of arr)
{
    console.log(val);
}

//for in loop
for(let index in arr)
{
    console.log(arr[index]);
}

//foreach loop
let array=[100,200,300,400,500];
array.forEach(element => {
    console.log(element);
});