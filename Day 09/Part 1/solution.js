const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode.js");

function run(intcode) {
	I = new Intcode(intcode, [1], return_input=(require.main === module));
	return I.run();
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;