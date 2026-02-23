let myDate= new Date();
console.log(myDate.toString());

console.log(myDate.toISOString());
console.log(myDate.toLocaleDateString());
console.log(typeof myDate);

timestmp= myDate.getTime();
console.log("Time stamp is: "+timestmp);
let mytimestamp= Date.now();
console.log(mytimestamp);
console.log(Date.now());
console.log(Date.now()/1000);//in seconds

//activity how to calculatte exat time by using datetime

console.log(myDate.getDate());
console.log(myDate.getMonth());
console.log(myDate.getFullYear());
console.log(myDate.getHours());
console.log(myDate.getMinutes());
console.log(myDate.getSeconds());
console.log(myDate.getMilliseconds());

//variables data trype string number data types summary 