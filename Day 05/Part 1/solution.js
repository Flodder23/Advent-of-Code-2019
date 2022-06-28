const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode");

function run (intcode) {
	i = new Intcode(intcode, [1]);
	return i.run();
}

if (require.main === module) {
	run(input);
}

module.exports = run;