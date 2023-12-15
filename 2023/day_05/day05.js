const fs = require("fs");
const data = fs.readFileSync('input_05.txt', 'utf-8');

let lines = data.trim().split(/\r?\n/);

const seedsLine = lines.shift().replace('seeds: ', '');
const seeds = seedsLine.split(' ').map(e => Number(e.trim()));

lines.shift();

let maps = {};

let map = null;
lines.forEach((line) => {

	if (line === '') {
		return;
	}

	if (/^[a-zA-Z].*/.test(line)) {
		map = line.replace('map:', '').trim();
		maps[map] = {
			key: map,
			mappings: [],
		};
	} else {
		const numbers = line.split(' ').map(e => Number(e));
		maps[map].mappings.push({
			destination: numbers[0],
			source: numbers[1],
			amount: numbers[2],
			move: numbers[0] - numbers[1],
			sourceEnd: numbers[1] + numbers[2],
		});
	}
});

maps = Object.values(maps);


maps.forEach(map => {

	seeds : for(let s = 0; s < seeds.length; s++) {

		for(let m = 0; m < map.mappings.length; m++) {

			let mapping = map.mappings[m];

			if(seeds[s] < mapping.source || seeds[s] >= mapping.sourceEnd) {
				continue;
			}

			// console.log(seeds[s], JSON.stringify(mapping));
			seeds[s] += mapping.move;
			continue seeds;
		}
	}

});


console.log('Day 5 Part 1', Math.min(...seeds));

/**
 * PART 2
 */

const seedRanges = seedsLine.split(' ').map(e => Number(e.trim())).reduce((bag, e, i) => {
	let index = Math.floor(i/2);
	if(i % 2 === 0) {
		bag[index] = {
			start: e,
			end: null,
			length: null,
		};
	} else {
		bag[index].end = bag[index].start + e - 1;
		bag[index].length = e;
	}
	return bag;
}, []);

// console.log(seedRanges);

function mapSeeds(mappings, seeds) {

	const returns = [];

	seeds: for(let s = 0; s < seeds.length; s++) {

		for(let m = 0; m < mappings.length; m++) {

			if (seeds[s].end >= mappings[m].source && seeds[s].start < mappings[m].sourceEnd) {


				const overlap = {
					start: Math.max(mappings[m].source, seeds[s].start) + mappings[m].move,
					end: Math.min(mappings[m].sourceEnd, seeds[s].end) + mappings[m].move,
				}

				// console.log('overlap', seeds[s], mappings[m], overlap);

				returns.push(overlap);

				if(seeds[s].start < mappings[m].source) {
					returns.push(mapSeeds(mappings.slice(m+1), [{
						start: seeds[s].start,
						end: mappings[m].source -1,
					}]));
				}

				if(seeds[s].end >= mappings[m].sourceEnd) {
					returns.push(mapSeeds(mappings.slice(m+1), [{
						start: mappings[m].sourceEnd,
						end: seeds[s].end,
					}]));
				}

				continue seeds;

			}


		}
		returns.push(seeds[s]);
	}
	return returns.flat();

}


let seedReturn = seedRanges.slice();

for(let m = 0; m < maps.length; m++) {

	seedReturn = mapSeeds(maps[m].mappings, seedReturn).flat();

}

console.log('Day 5 Part 2', Math.min(...seedReturn.map(e => e.start)));
