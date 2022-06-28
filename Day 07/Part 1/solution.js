const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode.js");

function getSignal(phase, total, intcode) {
	let i = new Intcode(intcode, [phase, total], return_output = true);
	return i.run()
}

function run(intcode) {
	let max = null;
	for (let a = 0; a < 5; a++) {
		for (let b = 0; b < 5; b++) {
			for (let c = 0; c < 5; c++) {
				for (let d = 0; d < 5; d++) {
					for (let e = 0; e < 5; e++) {
						if (a != b && a != c && a != d && a != e && b != c && b != d && b != e && c != d && c != e && d != e) {
							let total = 0;
							for (phase of [a, b, c, d, e]) {
								total = getSignal(phase, total, intcode);
							}
							if (max == null || total > max) {
								max = total
							}
						}
					}
				}
			}
		}
	}
	return max;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;