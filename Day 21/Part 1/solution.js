const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function run(intcode) {
	code = (
		"NOT A J\n" +
		"NOT B T\n" +
		"OR T J\n" +
		"NOT C T\n" +
		"OR T J\n" +
		"AND D J\n" +
		"WALK\n").split("").map(x => x.charCodeAt(0));
	droid = new Intcode(intcode, code);
	while (!droid.halt) {
		droid.run();
	}
	return droid.last_output;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;