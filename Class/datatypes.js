let a=Symbol("123")
console.log(a);
let id=123
console.log(id===a);


//Array
const arr=[1,2,3,4,5]
console.log(arr);
console.log(typeof arr); //object

//object
const myobj={
    name:"shri",
    age:21,
    email:"shri@gmail.com"
}
console.log(myobj);
console.log(myobj.name);

console.log(typeof myobj); //object
//activities
//1.function defination , declaration and alling

//function
function greet(){
    return "hello world"
}
console.log(greet());

let ab=5
function square(num)
{
    return num*num
}

console.log(square(ab));

let fun=function hello(){
    console.log("hello");
}
fun();