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

function get_bio_rate(board) {
	let t = 0; let n = 0;
	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board[y].length; x++) {
			if (board[y][x] == "#") {
				t += 2**n
			}
			n++
		}
	}
	return t
}

function run(board) {
	let past = []
	let p = 0;
	while (!past.includes(p)) {
		past.push(p);
		board = new_board(board);
		p = get_bio_rate(board);
	}
	return p
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;