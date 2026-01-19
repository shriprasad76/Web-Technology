let score="22"
let score_for_bool=true
let score_for_null=null
let score_for_undefined=undefined
console.log(typeof(score))                    
console.log(typeof(score_for_bool))           
console.log(typeof(score_for_null))         
console.log(typeof(score_for_undefined))      


let a = "shri";
let a_converted_number = Number(a);
console.log(typeof a_converted_number);

let a_converted_string = String(a_converted_number);
console.log(typeof a_converted_string);

let a_converted_bool = Boolean(a_converted_number);
console.log(typeof a_converted_bool);

let str = "shriprasad";
let str_to_bool = Boolean(str);
console.log(typeof str_to_bool);

let num = 100;
let num_to_bool = Boolean(num);
console.log(typeof num_to_bool);

let boolVal = true;
let bool_to_num = Number(boolVal);
console.log(typeof bool_to_num);

let x = null;
console.log(Number(x));
console.log(String(x));
console.log(Boolean(x));

let y = undefined;
console.log(Number(y));
console.log(String(y));
console.log(Boolean(y));

let empty = "";
console.log(Number(empty));
console.log(Boolean(empty));
console.log(String(empty));

let pure = "200";
console.log(Number(pure));
console.log(Boolean(pure));
console.log(String(pure));


// Activity number one:
//1.conversion of all datatypes
//imp note:-javascript only automatically converts string to number only arithmatic operation.


//#Arithmatic Operations
console.log(10+5)
console.log(10-5)
console.log(10/5)
console.log(10*5)
console.log(10%5)

let str1="Hello "
let str2="Shri..!!!"
console.log(str1+str2);
console.log("1"+2)
console.log("1"+2+2)
console.log(2+"1")
console.log(2+3+"1")

console.log((3+4)*5%3);


