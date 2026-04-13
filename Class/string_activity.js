let gameCount = "shri"

// slice()
const slicedString = gameCount.slice(0,3);
console.log(slicedString);

// substring()
const substring = gameCount.substring(0,3);
console.log(substring);

// replace()
let trimmedString = "shri"
const replacedString = trimmedString.replace("shri","shriprasad");
console.log(replacedString);

// includes()
const includesResult = gameCount.includes("sh");
console.log(includesResult);

// split()
const splitString = gameCount.split("h");
console.log(splitString);

// repeat()
const repeatString = gameCount.repeat(3);
console.log(repeatString);

// concat()
const concatString = gameCount.concat(" is learning JavaScript");
console.log(concatString);

// toString()
const num = 123;
const numToString = num.toString();
console.log(numToString);
console.log(typeof(numToString));

// padStart()
const paddedStartString = gameCount.padStart(10,"*");
console.log(paddedStartString);

// padEnd()
const paddedEndString = gameCount.padEnd(10,"*");
console.log(paddedEndString);

// lastIndexOf()
const lastIndex = gameCount.lastIndexOf("r");
console.log(lastIndex);

// search()
const searchIndex = gameCount.search("ri");
console.log(searchIndex);