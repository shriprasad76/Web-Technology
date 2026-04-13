let myDate = new Date()

console.log(myDate)
console.log(myDate.toString())
console.log(myDate.toISOString())
console.log(myDate.toLocaleDateString())
console.log(myDate.toDateString())
console.log(typeof myDate)

console.log(myDate.getDate())
console.log(myDate.getMonth()) // will give 0 because month starts count from 0
console.log(myDate.getFullYear())
console.log(myDate.getHours())
console.log(myDate.getTime())

console.log(myDate.getUTCDate())
console.log(myDate.getUTCDay())
console.log(myDate.getUTCFullYear())
console.log(myDate.getUTCHours())
console.log(myDate.getUTCSeconds())

let myTimeStamp = Date.now()
console.log(myTimeStamp)
console.log(Date.now())
console.log(Date.now()/1000)