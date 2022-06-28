const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode");

function run(intcode) {
	let d = 0;
	let map = {
		0: {
			0: 1
		}
	};
	let c = [0, 0];
	let Painter = new Intcode(intcode, [], true)
	while (!Painter.halt) {
		if (typeof map[c[0]] == "undefined") {
			map[c[0]] = {}
		}
		if (typeof map[c[0]][c[1]] == "undefined") {
			map[c[0]][c[1]] = 0;
		}
		Painter.input.values.push(map[c[0]][c[1]]);
		map[c[0]][c[1]] = Painter.run();
		let dd = Painter.run();
		if (dd == 0) {
			d--;
		} else if (dd == 1) {
			d++;
		} else {
			throw RangeError(`${dd} is not a valid direction change`)
		}
		if (d == -1) {
			d = 3
		} else if (d == 4) {
			d = 0
		} else if (![0, 1, 2, 3].includes(d)){
			throw RangeError(`${d} is not a valid direction`)
		}
		if (d == 0) {
			c[1] --;
		} else if (d == 1) {
			c[0] ++;
		} else if (d == 2) {
			c[1] ++;
		} else if (d == 3) {
			c[0] --;
		} else {
			throw RangeError(`${d} is not a valid direction`)
		}
	}
	for (let y = 0; y < 6; y++) {
		let out = ""
		for (let x = 0; x < 43; x++) {
			if (typeof map[x][y] == "undefined" || map[x][y] == 0) {
				out += "."
			} else if (map[x][y] == 1) {
				out += "#"
			} else {
				throw ReferenceError(`${map[x][y]} is not a valid paint reference.`)
			}
		}
		console.log(out);
	}
}


if (require.main === module) {
	run(input);
}

module.exports = run;