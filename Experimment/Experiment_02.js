//1. Array declaraton
   //1. Find largest elemenet in array
   //2. remove duplicates from array
   //3. Find missing number in array
//2. functioon
   //1)function to find even or odd
   //2)function to find sum of array
//3. string
   //1)count vowels
//4. Reverse number
//5. Check pallindrome number
//6. fibbonocci series


//Array:-
//Array declaration

let arr=[12,34,12,78,90,34,45,67,45,12];
//1. Find largest element in array
let maximum=arr[0];
 for(let i=1;i<arr.length;i++){
    if(arr[i]>maximum)
    {
        maximum=arr[i]
    }
}
console.log("Maximum number is: "+maximum);

//remove duplicates from array
let arr4 = [1, 2, 3, 2, 4, 1, 5];
let result = [];

for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;

    for (let j = 0; j < result.length; j++) {
        if (arr4[i] === result[j]) {
            isDuplicate = true;
            break;
        }
    }

    if (!isDuplicate) {
        result.push(arr4[i]);
    }
}

console.log(result);

//find missing number in array
let arr1=[1,2,3,4,6,7,8,9,10];
let m=1
for(let i=0;i<10;i++)
{
    if(arr1[i]==m)
    {
        m++;
    }
    else{
        console.log("Missing number is: "+m);
        break;
    }
}

//function to find even or odd
let num=6
function evenOdd(num)
{
    if(num%2==0)
    {
        console.log("Given number is even");
        
    }
    else{
        console.log("Given number is odd");
        
    }
}
evenOdd(num);

//function to find sum of array
let s=0;
function sum(arr)
{
    let sum=0
    for(let i=0;i<arr.length;i++)
    {
        sum=sum+arr[i]

    }
    console.log("Sum of element of arra is: "+sum);
    
}
sum(arr);

//reverse number
let n=123
let rev=0;
while(n>0)
{
    let a=n%10;
    rev=rev*10+a;
    n=Math.floor(n/10)
}
console.log("Reversed number is: "+rev);

//check pallindrome number
let number=121
let original=number;
let reversed=0,c;
while(number>0)
{
    c=number%10
    reversed=reversed*10+c;
    number=Math.floor(number/10);
}
if(original==reversed)
{
    console.log("Given number is pallindrome");
}


//fibbonocci number
let nu=10
console.log("1 \n2")
let a1=1,a2=2,a3;
for(let i=3;i<=nu;i++)
{ 
    a3=a1+a2
    console.log(a1+a2);
    a1=a2;
    a2=a3;
}

//count vowels
let str1="shriprasad vitthalrao patil"
let count=0;
for(let i=0;i<str1.length;i++)
{
    if(str1[i]=="a"||str1[i]=="e"||str1[i]=="i"||str1[i]=="o"||str1[i]=="u")
    {
        count++
        console.log(str1[i]);
        
    }
}
console.log("Number of volwels present in the string is: "+count);

//
