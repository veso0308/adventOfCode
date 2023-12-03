const fs = require("fs");

const data = fs.readFileSync('input/day1.txt', 'utf-8');


let result = data.trim().split("\n\n").map(e => {
	return e.split("\n").map(e => Number(e)).reduce((cur,bag) => bag + cur, 0);
});

result = result.sort((a,b) => b-a);
console.log(result);
console.log(result.slice(0,3).reduce((curr, bag) => curr + bag));

