const fs = require("fs");
const data = fs.readFileSync('input/input_01.txt', 'utf-8');


const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
lines = data.split('\r\n');

const firstRegExpA = new RegExp("(\\d)");
const firstRegExpB = new RegExp("(\\d|zero|one|two|three|four|five|six|seven|eight|nine)");
const lastRegExpA = new RegExp(".*(\\d).*$");
const lastRegExpB = new RegExp(".*(\\d|zero|one|two|three|four|five|six|seven|eight|nine).*$");

lines = lines.map(line => {
	line = line.trim();
	const first = line.match(firstRegExpB);
	const last = line.match(lastRegExpB);
	// console.log(line, first, last);
	if ((isNaN(first[1]) && NUMBERS.indexOf(first[1].toLowerCase()) === -1) || (isNaN(last[1]) && NUMBERS.indexOf(last[1].toLowerCase()) === -1)) {
		// console.log('ALERT', line, first, last);
		process.exit(-1);
	}

	let firstNumber = !isNaN(first[1]) ? Number(first[1]) : NUMBERS.indexOf(first[1].toLowerCase());
	let lastNumber = !isNaN(last[1]) ? Number(last[1]) : NUMBERS.indexOf(last[1].toLowerCase());

	let output =  {line, first, last, firstNumber, lastNumber, number: Number('' + firstNumber + lastNumber)};
	console.log(line, firstNumber, lastNumber);
	// console.log(output);
	return output;


});
console.log(lines);
console.log(lines.reduce((bin,a) => a.number+bin, 0));