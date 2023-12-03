const fs = require("fs");
const data = fs.readFileSync('input/input_01.txt', 'utf-8');


const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
lines = data.split('\r\n');

const digitsmatch = '\\d|' + NUMBERS.join('|');
const firstRegExp = new RegExp("(\\d|zero|one|two|three|four|five|six|seven|eight|nine)");
const lastRegExp = new RegExp(".*(\\d|zero|one|two|three|four|five|six|seven|eight|nine).*$");

console.log(digitsmatch);

lines = lines.map(line => {
	line = line.trim();
	const first = line.match(firstRegExp);
	const last = line.match(lastRegExp);
	console.log(line, first, last);
	if ((isNaN(first[1]) && NUMBERS.indexOf(first[1].toLowerCase()) === -1) || (isNaN(last[1]) && NUMBERS.indexOf(last[1].toLowerCase()) === -1)) {
		console.log('ALERT', line, first, last);
		process.exit(-1);
	}

	let firstNumber = !isNaN(first[1]) ? Number(first[1]) : NUMBERS.indexOf(first[1].toLowerCase());
	let lastNumber = !isNaN(last[1]) ? Number(last[1]) : NUMBERS.indexOf(last[1].toLowerCase());

	let output =  {line, first, last, firstNumber, lastNumber, sum: Number('' + firstNumber + lastNumber)};
	console.log(line, firstNumber, lastNumber);
	// console.log(output);
	return output;


});
console.log(lines);
console.log(lines.reduce((bin,a) => a.sum+bin, 0));