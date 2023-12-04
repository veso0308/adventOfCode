const fs = require("fs");
const data = fs.readFileSync('input/input_03.txt', 'utf-8');


let map = data.split("\r\n").map(e => e.trim().split(''));

const isNumber = (x) => x >= '0' && x <= '9';

const numbers = [];
for(let y = 0; y < map.length; y++) {

	let currNumber = {indexX: -1, indexY: -1, number: ''};

	for(let x = 0; x < map[y].length; x++) {
		const currChar = map[y][x];

		if(isNumber(currChar)) {

			if (currNumber.indexX === -1) {
				currNumber.indexX = x;
				currNumber.indexY = y;
			}

			currNumber.number += currChar;

		} else {
			if(currNumber.indexX !== -1) {

				numbers.push({indexX: currNumber.indexX, indexY: currNumber.indexY, number: Number(currNumber.number), size: currNumber.number.length});
				currNumber = {indexX: -1, indexY: -1, number: ''};

			}
		}
	}

	if(currNumber.indexX !== -1) {

		numbers.push({indexX: currNumber.indexX, indexY: currNumber.indexY, number: Number(currNumber.number), size: currNumber.number.length});
		currNumber = {indexX: -1, indexY: -1, number: ''};

	}

}

const isNotPoint = (x) => x !== '.';

const validNumbers = [];

main : for (let n = 0; n < numbers.length; n++) {

	const currNumber = numbers[n];

	// check before
	if(currNumber.indexX > 0 && isNotPoint(map[currNumber.indexY][currNumber.indexX -1])) {
		validNumbers.push(currNumber);
		continue;
	}
	// check after
	if((currNumber.indexX + currNumber.size) < (map[currNumber.indexY].length) && isNotPoint(map[currNumber.indexY][currNumber.indexX + currNumber.size])) {
		validNumbers.push(currNumber);
		continue;
	}

	// check above
	if (currNumber.indexY > 0) {

		for(let x = currNumber.indexX; x < currNumber.indexX+currNumber.size; x++) {
			if(isNotPoint(map[currNumber.indexY-1][x])) {
				validNumbers.push(currNumber);
				continue main;
			}
		}
	}

	// check below
	if (currNumber.indexY < (map.length - 1)) {

		for(let x = currNumber.indexX; x < currNumber.indexX+currNumber.size; x++) {
			if(isNotPoint(map[currNumber.indexY+1][x])) {
				validNumbers.push(currNumber);
				continue main;
			}
		}
	}

	// check left top
	if (currNumber.indexX > 0 && currNumber.indexY > 0 && isNotPoint(map[currNumber.indexY-1][currNumber.indexX -1])) {
		validNumbers.push(currNumber);
		continue;
	}

	// check left below
	if (currNumber.indexX > 0 && (currNumber.indexY < (map.length - 1)) && isNotPoint(map[currNumber.indexY + 1][currNumber.indexX - 1])) {
		validNumbers.push(currNumber);
		continue;
	}

	// check right top
	if (((currNumber.indexX + currNumber.size) < (map[currNumber.indexY].length)) && currNumber.indexY > 0 && isNotPoint(map[currNumber.indexY-1][currNumber.indexX + currNumber.size])) {
		validNumbers.push(currNumber);
		continue;
	}

	// check right below
	if (((currNumber.indexX + currNumber.size) < (map[currNumber.indexY].length)) && (currNumber.indexY < (map.length - 1)) && isNotPoint(map[currNumber.indexY + 1][currNumber.indexX + currNumber.size])) {
		validNumbers.push(currNumber);
		continue;
	}

}

const isGearSymbol = (x) => x === '*';
console.log('Day 3 part 1', validNumbers.reduce((bag,e) => bag+e.number,0));

const gearRatios = [];

for(let y = 0; y < map.length; y++) {
	for(let x = 0; x < map[y].length; x++) {

		if (!isGearSymbol(map[y][x])) {
			continue;
		}
		// console.log('Gearsymbol found', y, x);

		// find number above or below
		const numbersAbove = numbers.filter(n => (n.indexY >= y-1) && (n.indexY <= y+1) && n.indexX <= (x+1) && (n.indexX+n.size-1) >= (x-1) );
		if(numbersAbove.length === 2) {
			// console.log('factors found', numbersAbove);
			gearRatios.push(numbersAbove);
		}
	}
}

// console.log(gearRatios);
console.log('Day 3 part 2', gearRatios.reduce((bag, x) => bag + x[0].number*x[1].number, 0));