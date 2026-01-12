//example of scope in let
let a = "shri"
{
    let a = "shriprasad"
    console.log(a);
}
console.log(a);

//example of scope in var
var b = "shri"
{
    var b = "shriprasad"
    console.log(b);
}
console.log(b);

//grade according to marks of student
let marks = 85;
let grade;
if (marks >= 90) {
    grade = "A";
} else if (marks >= 80) {
    grade = "B";
} else if (marks >= 70) {
    grade = "C";
} else if (marks >= 60) {
    grade = "D";
} else {
    grade = "F";
}
console.log("Grade:", grade);

//table of number using for loop
let number = 5;
for (let i = 1; i <= 10; i++) {
    console.log(number*i);

}
//even or odd number
let num=17
if(num%2==0){
    console.log(num+" is even number");
}
else{
    console.log(num+" is odd number");
}
//factorial of number using while loop
let n=5
let fact=1
let i=1 
while(i<=n){
    fact=fact*i
    i++
}   
console.log("Factorial of "+n+" is "+fact);