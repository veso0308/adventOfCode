const fs = require("fs");
const data = fs.readFileSync('input/input_02.txt', 'utf-8');


let games = data.split("\r\n").map(e => e.trim());


games = games.map(line => {

   const game = line.split(":").map(e => e.trim());
    // console.log('game', game);
    const id = game[0].replace('Game ', '');

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

    console.log(line, bags);

    return {line, id, bags};

});


const FILTER = {
    'red': 12,
    'green': 13,
    'blue': 14,
};

const FILTER_KEYS = Object.keys(FILTER);

console.log(games);


const returned = games.filter(g => {

    console.log(JSON.stringify(g)); // TODO: wtf is bags empty here but not in row 51?!

    const colors = Object.keys(g.bags);

    for(let i = 0; i < colors.length; i++) {
        if (!FILTER_KEYS.includes(colors[i])) {
            console.log('not included', JSON.stringify(FILTER_KEYS), colors[i]);
            return false;
        }
        if (g.bags[colors[i]] > FILTER[colors[i]]) {
            console.log('more', colors, JSON.stringify(g), JSON.stringify(g.bags));
            return false;
        }
    }
    return true;

});

console.log(returned.length);