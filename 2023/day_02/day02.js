const fs = require("fs");
const data = fs.readFileSync('input/input_02.txt', 'utf-8');


let games = data.split("\r\n").map(e => e.trim());


games = games.map(line => {

   const game = line.split(":").map(e => e.trim());
    // console.log('game', game);
    const id = Number(game[0].replace('Game ', ''));

    const bags = [];
    game[1].split(";").forEach(group => {
        // console.log('group', group);
        group = group.trim();
        const balls = group.split(",").map(e => e.trim());

        balls.forEach(ball => {

            const [amount, color] = ball.split(' ');
            if(!bags.hasOwnProperty(color)) {
                bags[color] = 0;
            }

            if (bags[color] < Number(amount)) {
                bags[color] = Number(amount);
            }

        });


    });

    // console.log(line, bags);

    return {line, id, bags};

});


const FILTER = {
    'red': 12,
    'green': 13,
    'blue': 14,
};

const FILTER_KEYS = Object.keys(FILTER);

const valid_games = [];

outter: for(let i = 0; i < games.length; i++) {
    const game = games[i];
    // console.log('GGGG', game);

    const colors = Object.keys(game.bags);
    // console.log('COLORS', colors);

    for(let i = 0; i < colors.length; i++) {
        if (!FILTER_KEYS.includes(colors[i])) {
            // console.log('not included', JSON.stringify(FILTER_KEYS), colors[i]);
            continue outter;
        }
        if (game.bags[colors[i]] > FILTER[colors[i]]) {
            // console.log('more', colors, JSON.stringify(game), JSON.stringify(game.bags));
            continue outter;
        }
    }
    valid_games.push(game);
}

// console.log(valid_games);
console.log('Solution day 1 part 1', valid_games.reduce((bag, a) => bag+a.id, 0));

power = games.reduce((bag, game) => bag + Object.values(game.bags).reduce((power,ball) => power*ball,1), 0);

console.log('Solution day 2 part 2', power);