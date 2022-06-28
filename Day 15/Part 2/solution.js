const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode.js");

const undoMove = {
	1: 2,
	2: 1,
	3: 4,
	4: 3
}
const move = {
	1: c => [c[0], c[1] + 1],
	2: c => [c[0], c[1] - 1],
	3: c => [c[0] - 1, c[1]],
	4: c => [c[0] + 1, c[1]]
}

function text_map(map, bots) {
	bp = bots.map(bot => 100 * bot.pos[0] + bot.pos[1]);
	let out = ""
	for (y=21; y >= -19; y--) {
		row = ""
		for (x=-21; x <= 19; x++) {
			if (bp.includes(100 * x + y)) {
				row += "X"
			} else if (typeof map[y] == "undefined" || typeof map[y][x] == "undefined") {
				row += " "
			} else {
				row += map[y][x];
			}
		}
		out += row + "\n"
	}
	return out//.substring(0, out.length - 1)
}

function make_maze(map, pos, bot) {
	possible = []
	for (m = 1; m <= 4; m++) {
		let w = move[m](pos);
		if (typeof map[w[1]] == "undefined") {
			map[w[1]] = {}
		}
		if (typeof map[w[1]][w[0]] == "undefined") {
			bot.add_input(m);
			let c = bot.run();
			if (c == 0) {
				map[w[1]][w[0]] = "#";
			} else if (c == 1) {
				map[w[1]][w[0]] = ".";
				bot.add_input(undoMove[m]);
				bot.run();
				possible.push(m);
			} else if (c == 2) {
				map[w[1]][w[0]] = "0";
				bot.add_input(undoMove[m]);
				bot.run();
				possible.push(m);
			} else {
				throw ReferenceError(`${c} is an invalid staus code`)
			}
		}
	}
	return possible
}

function find_oxygen(map, bot) {
	bots = [bot]
	while (bots.length > 0) {
		let new_bots = []
		for (bot of bots) {
			for (m of make_maze(map, bot.pos, bot.bot)) {
				let new_bot = new Intcode([...bot.bot.code], [m])
				new_pos = move[m](bot.pos)
				new_bot.pointer = bot.bot.pointer;
				new_bot.relative_base = bot.bot.relative_base;
				new_bot.run()
				new_bots.push({
					bot: new_bot,
					pos: new_pos,
					moves: bot.moves + 1
				})
				if (typeof map[new_pos[1]] != "undefined") {
					if (typeof map[new_pos[1]][new_pos[0]] != "undefined") {
						if (map[new_pos[1]][new_pos[0]] == "0") {
							return new_bots[new_bots.length - 1];
						}
					}
				}
			}
		}
		bots = new_bots
	}
}

function oxygen_time(map, pos, bot) {
	possible = []
	for (m = 1; m <= 4; m++) {
		let w = move[m](pos);
		if (typeof map[w[1]] == "undefined") {
			map[w[1]] = {}
		}
		if (typeof map[w[1]][w[0]] == "undefined" || map[w[1]][w[0]] == ".") {
			bot.add_input(m);
			let c = bot.run();
			if (c == 0) {
				map[w[1]][w[0]] = "#";
			} else if (c == 1) {
				map[w[1]][w[0]] = bot.moves + 1;
				bot.add_input(undoMove[m]);
				bot.run();
				possible.push(m);
			} else if (c == 2) {
				map[w[1]][w[0]] = "0";
				bot.add_input(undoMove[m]);
				bot.run();
				possible.push(m);
			} else {
				throw ReferenceError(`${c} is an invalid staus code`)
			}
		}
	}
	return possible
}

function run(intcode) {
	let map = {0: {0: "S"}};
	let bot = {
		bot: new Intcode([...intcode]),
		pos: [0, 0],
		moves: 0
	};
	bots = [find_oxygen(map, bot)]
	console.log(text_map(map, []));
	let moves = 0;
	while (bots.length > 0) {
		let new_bots = []
		for (bot of bots) {
			for (m of oxygen_time(map, bot.pos, bot.bot)) {
				let new_bot = new Intcode([...bot.bot.code], [m])
				new_pos = move[m](bot.pos)
				new_bot.pointer = bot.bot.pointer;
				new_bot.relative_base = bot.bot.relative_base;
				new_bot.run()
				new_bots.push({
					bot: new_bot,
					pos: new_pos,
					moves: bot.moves + 1
				})
			}
		}
		bots = new_bots
		moves ++;
	}
	return moves - 1;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;