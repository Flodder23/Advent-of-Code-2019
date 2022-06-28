const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function run(intcode) {
	let board = [];
	let I = new Intcode(intcode, [], true);
	let score;
	while (!I.halt) {
		if (I.input.values.length < I.input.pointer + 2) {
			I.input.values.push(0);
		}
		let x = I.run();
		let y = I.run();
		let tile = I.run();
		if (x == -1 && y == 0) {
			score = tile
		}
		if (typeof board[y] == "undefined") {
			board[y] = [];
		}
		board[y][x] = tile;
	}
	console.log(score);
}

if (require.main === module) {
	input[0] = 2;
	for (i = -17; i <= 17; i++) {
		input[1434 + i] = 3;
	}
	run(input);
}

module.exports = run;