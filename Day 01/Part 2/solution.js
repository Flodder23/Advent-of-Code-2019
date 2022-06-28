const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function getFuelNeeded(mass) {
	return Math.floor(mass / 3) - 2;
}

function run(input) {
	let total = 0;
	for (i=0; i<input.length; i++) {
		let fuel = input[i];
		while (fuel > 0) {
			fuel = getFuelNeeded(fuel);
			if (fuel > 0) {
				total += fuel
			}
		}
	}
	return total;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;