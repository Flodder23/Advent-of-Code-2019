const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function run(intcode) {
	let map = "";
	let affected = 0;
	for (y = 0; y < 200; y++) {
		for (x = 0; x < 200; x++) {
			let drone = new Intcode([...intcode], [x, y]);
			let a = drone.run();
			if (a == 0) {
				map += "."
			} else if (a == 1) {
				map += "#"
				affected++
			} else {
				throw ReferenceError(`${a} is not a valid status`)
			}
		}
		map += "\n"
	}
	console.log(map);
	return affected
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;