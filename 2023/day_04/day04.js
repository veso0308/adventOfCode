const fs = require("fs");
const data = fs.readFileSync('input/input_04.txt', 'utf-8');

const cards = data.trim().split('\r\n').map(e => e.trim());

const games = cards.map(game => {

	game = game.split(':');
	const id = Number(game[0].replace('Card', '').trim());

	const [winningNumbers, numbers] = game[1].split('|').map(n => n.trim().split(/\s+/).map(x => Number(x.trim())));

	const winners = numbers.filter(e => winningNumbers.includes(e))/*.filter((x,i,a) => a.indexOf(x) === i)*/;

	return {id, winningNumbers, numbers, winners, points: (winners.length > 0 ? (2**(winners.length-1)) : 0), copies: 1};
});

// console.log(games);

const partOne = games.reduce((bag,x)=> bag+x.points,0);

console.log('Day 4 part 1', partOne);

for(let g = 0; g < games.length; g++) {

	const copies = games[g].copies;
	console.log('game', games[g].id, games[g].winners.length, copies);
	for(let w = 1; w <= games[g].winners.length; w++) {

		if(!games[g+w].hasOwnProperty('copies')) {
			games[g+w].copies = 1;
		}
		games[g+w].copies += copies;

	}

}

const partTwo = games.reduce((bag, x) => bag+x.copies, 0);
console.log('Day 4 par 2', partTwo);