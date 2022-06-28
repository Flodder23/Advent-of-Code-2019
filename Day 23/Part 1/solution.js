const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode");

function run(intcode) {
	comp = [];
	for (let i = 0; i < 50; i++) {
		comp.push(new Intcode([...intcode], [i]));
		comp[i].run();
	}
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;