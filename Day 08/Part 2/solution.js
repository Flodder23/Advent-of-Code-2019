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

	let image = layers[0];
	for (layer of layers) {
		for (let y = 0; y < 6; y++) {
			for (let x = 0; x < 25; x++) {
				if (image[y][x] == 2) {
					image[y][x] = layer[y][x];
				}
			}
		}
	}
	return image.map(x => x.join(","));
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;