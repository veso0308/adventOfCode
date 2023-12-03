const fs = require("fs");

const data = fs.readFileSync('input/day02.txt', 'utf-8');

const chars = {
	X: { // rock
		value: 1,
		opponent: {
			A: 3,
			B: 0,
			C: 6,
		}
	},
	Y: { // paper
		value: 2,
		opponent: {
			A: 6,
			B: 3,
			C: 0,
		}
	},
	Z: { // scissors
		value: 3,
		opponent: {
			A: 0,
			B: 6,
			C: 3,
		}
	},
};

const predictions = {
	X: { // lose
		A: 3 + 0, // rock: scissors + lose
		B: 1 + 0, // paper: rock + lose
		C: 2 + 0, // scissors: paper + lose
	},
	Y: { // draw
		A: 1 + 3, // rock: rock + draw
		B: 2 + 3, // paper: paper + draw
		C: 3 + 3, // scissors: scissors + draw
	},
	Z: { // win
		A: 2 + 6, // rock: paper + lose
		B: 3 + 6, // paper: scissors + lose
		C: 1 + 6, // scissors: rock + lose
	},
}

// result = data.trim().split('\r\n').map(e => {
// 	const cur = e.split(" ");
// 	return chars[cur[1]].value + chars[cur[1]].opponent[cur[0]];
// }).reduce((cur, bag) => cur+bag, 0);

result = data.trim().split('\r\n').map(e => {
	const cur = e.split(" ");
	return predictions[cur[1]][cur[0]];
}).reduce((cur, bag) => cur+bag, 0);


console.log(result);

