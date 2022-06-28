const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function get_map(intcode) {
	let i = new Intcode(intcode);
	map = "";
	while (!i.halt) {
		map += String.fromCharCode(i.run());
	}
	return map;
}

function check_intersection(map, x, y) {
	if (map[y][x] == "#") {
		if (map[y+1][x] == "#") {
			if (map[y][x+1] == "#") {
				if (map[y-1][x] == "#") {
					if (map[y][x-1] == "#") {
						return true;
					}
				}
			}
		}
	}
	return false;
}

function run(intcode) {
	checksum = 0;
	map = get_map(intcode).split("\n").map(row => row.split(""));
	for (y = 1; y < map.length - 1; y++) {
		for (x = 1; x < map.length - 1; x++) {
			if (check_intersection(map, x, y)) {
				map[y][x] = "O"
				checksum += x * y;
			}
		}
	}
	console.log(map.map(x => x.join("")).join("\n"))
	return checksum;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;