/* Experiment 1 */

//Activity 1 :-
document.writeln("<b>Activity 1:</b><br>");

let arr = [1,2,3,4];

//object
let obj = {name:'digvijay'}

//string
let s = "Digvijay";
let s1 = new String("Digvijay");

document.writeln("Array: " + arr + "<br>");
document.writeln("Object: " + JSON.stringify(obj) + "<br>");
document.writeln("String: " + s + "<br>");

//function
function f1() {
  document.writeln("text from function<br>");
  return 0;
}
document.writeln("Function: " + f1() + "<br><br>");


//Activity 2 :-
document.writeln("<b>Activity 2:</b><br>");

let a = [10,20,5,40,25];
let max = 0;
for(let i=0;i<a.length;i++){
  if(a[i] > max) max = a[i];
}
document.writeln("Largest number among array is: " + max + "<br><br>");


//Activity 3 :-
document.writeln("<b>Activity 3:</b><br>");

let n = "12345";
let rev = "";
for(let i=n.length-1;i>=0;i--){
  rev = rev + n[i];
}
document.writeln("Reverse of " + n + " is: " + rev + "<br><br>");


//Activity 4 :- (Palindrome)
document.writeln("<b>Activity 4:</b><br>");

let p = "abccba";
let j = p.length-1, i=0;

while(i<j){
  if(p[i] != p[j]) break;
  i++;
  j--;
}

if(i>=j) document.writeln(p + " is a palindrome<br><br>");
else document.writeln(p + " is not a palindrome<br><br>");


//Activity 5 :- Fibonacci
document.writeln("<b>Activity 5:</b><br>");

let fib = 10;
let n1 = 0, n2 = 1, nextterm;

document.writeln("Fibonacci Series:<br>");
for(let i=1;i<=fib;i++){
  document.writeln(n1 + " ");
  nextterm = n1 + n2;
  n1 = n2;
  n2 = nextterm;
}
document.writeln("<br><br>");


//Activity 6 :- Count vowels
document.writeln("<b>Activity 6:</b><br>");

let str = "digvijay";
let cnt = 0;

for(let i=0;i<str.length;i++){
  if(str[i]=='a'||str[i]=='e'||str[i]=='i'||str[i]=='o'||str[i]=='u'){
    cnt++;
  }
}
document.writeln("Number of vowels in " + str + " is: " + cnt + "<br><br>");


//Activity 7 :- Remove duplicates
document.writeln("<b>Activity 7:</b><br>");

let arr2 = [1,2,3,2,3,1,4];
let uniquearr = [];

for(let i=0;i<arr2.length;i++){
  if(!uniquearr.includes(arr2[i])){
    uniquearr.push(arr2[i]);
  }
}
document.writeln("Array without duplicates: " + uniquearr + "<br><br>");


//Activity 8 :- Even or Odd
document.writeln("<b>Activity 8:</b><br>");

function evenOrOdd(n){
  if(n%2 == 0) document.writeln(n + " is even<br>");
  else document.writeln(n + " is odd<br>");
}
evenOrOdd(7);
evenOrOdd(12);

document.writeln("<br>");


//Activity 9 :- Sum of array
document.writeln("<b>Activity 9:</b><br>");

let arr1 =[1,2,3,4,5];
let sumarr = arr1.reduce((sum,b) => sum + b, 0);

document.writeln("Sum of array is: " + sumarr + "<br>");