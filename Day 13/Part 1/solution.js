const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function run(intcode) {
	let board = [];
	let I = new Intcode(intcode, [], true);
	while (!I.halt) {
		x = I.run();
		y = I.run();
		tile = I.run();
		if (typeof board[y] == "undefined") {
			board[y] = [];
		}
		board[y][x] = tile;
	}
	t = 0;
	for (let row of board) {
		for (let tile of row) {
			if (tile == 2) {
				t++;
			}
		}
	}
	console.log(t);
}

if (require.main === module) {
	run(input);
}

module.exports = run;