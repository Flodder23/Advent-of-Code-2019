const fs = require("fs");
const runIntcode = require("../Part 1/solution");

function run(intcode, noun, verb) {
	intcode[1] = noun;
	intcode[2] = verb;
	return runIntcode(intcode)
}

if (require.main === module) {
	for (let i = 0; i < 100; i ++) {
		for (let j = 0; j < 100; j ++) {
			if (run(fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10)), i, j) == 19690720) {
				console.log("SUCCESS", i, j);
			}
		}
	}
}

module.exports = run;