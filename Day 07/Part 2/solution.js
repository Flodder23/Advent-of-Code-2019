const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode");

function run(intcode) {
	let max = null;
	for (let a = 5; a < 10; a++) {
		for (let b = 5; b < 10; b++) {
			for (let c = 5; c < 10; c++) {
				for (let d = 5; d < 10; d++) {
					for (let e = 5; e < 10; e++) {
						if (a != b && a != c && a != d && a != e && b != c && b != d && b != e && c != d && c != e && d != e) {
							let A = new Intcode([...intcode], [a], return_output=true);
							let B = new Intcode([...intcode], [b], return_output=true);
							let C = new Intcode([...intcode], [c], return_output=true);
							let D = new Intcode([...intcode], [d], return_output=true);
							let E = new Intcode([...intcode], [e], return_output=true);
							let total = 0;
							while (!E.halt) {
								for (Amp of [A, B, C, D, E]) {
									Amp.add_input(total);
									total = Amp.run()
								}
							}
							if (max == null || total > max) {
								max = total;
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