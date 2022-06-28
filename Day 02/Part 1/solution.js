const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const key = {
	1: (a, b) => a + b,
	2: (a, b) => a * b
};

function run(intcode) {
	for (let i = 0; intcode[i] != 99; i += 4) {
		intcode[intcode[i + 3]] = key[intcode[i]](intcode[intcode[i + 1]], intcode[intcode[i + 2]]);
	}
	return intcode[0];
}

if (require.main === module) {
	input[1] = 12
	input[2] = 2
	console.log(run(input));
}

module.exports = run;