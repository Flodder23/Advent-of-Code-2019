const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function get_surrounds(board, x, y) {
	let t = 0;
	if (x > 0) {
		if (board[y][x - 1] == "#") {
			t++
		}
	}
	if (x < board[0].length - 1) {
		if (board[y][x + 1] == "#") {
			t++
		}
	}
	if (y > 0) {
		if (board[y - 1][x] == "#") {
			t++
		}
	}
	if (y < board.length - 1) {
		if (board[y + 1][x] == "#") {
			t++
		}
	}
	return t;
}

function lives(board, x, y) {
	return get_surrounds(board, x, y) == 1;
}
function births(board, x, y) {
	return [1, 2].includes(get_surrounds(board, x, y));
}
function new_board(board) {
	let n = [];
	for (let y = 0; y < board.length; y++) {
		n.push("");
		for (let x = 0; x < board[y].length; x++) {
			if (board[y][x] == "#") {
				if (lives(board, x, y)) {
					n[n.length - 1] += "#";
				} else {
					n[n.length - 1] += ".";
				}
			} else if (board[y][x] == ".") {
				if (births(board, x, y)) {
					n[n.length - 1] += "#";
				} else {
					n[n.length - 1] += ".";
				}
			}
		}
	}
	return n
}

function run(board) {
	let past = []
	for(let i = 0; i < 200; i++) {
		board = new_board(board);
	}
	return get_alive(board);
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;