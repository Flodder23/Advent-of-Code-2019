const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" });

function run(input) {
	layers = []
	input = input.split("");
	while (input.length > 0) {
		layers.push([]);
		for (let i = 0; i < 6; i++) {
			layers[layers.length-1].push(input.splice(0, 25));
		}
	}
	min = [null, null];
	for (layer of layers) {
		n = [0, 0, 0];
		for (line of layer) {
			for (digit of line) {
				n[digit]++;
			}
		}
		if (min[0] == null || n[0] < min[0]) {
			min = [n[0], n[1] * n[2]]
		}
	}
	return min[1];
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;