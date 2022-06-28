const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function print_map(map) {
	for (row of map) {
		console.log(" ".repeat(row[0]) + "#".repeat(row[1]))
	}
}

function run(intcode) {
	let map = [];
	let x = 0; let y = 0;
	while (true) {
		let drone = new Intcode([...intcode], [x, y]);
		let s = drone.run();
		if (s == 1) {
			if (typeof map[y] == "undefined") {
				map[y] = [x];
			}
		} else if (s == 0) {
			if (typeof map[y] != "undefined") {
				map[y].push(x - map[y][0]);
				if (map[y][1] >= 100) {
					if (map[y - 99][1] - (map[y][0] - map[y - 99][0]) >= 100) {
						return [y - 99, map[y][0]]
					}
				}
				x = map[y][0] - 1;
				y++;
			} else if (map[y - 1][0] - x < -5) {
				map[y] = [map[y - 1][0], null]
				x = map[y][0] - 1
				y++;
			}
		} else {
			throw ReferenceError(`${s} is not a valid status`)
		}
		x++;
	}
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;