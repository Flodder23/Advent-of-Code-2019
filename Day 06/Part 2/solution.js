const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function run(input) {
	let map = {}
	let planets = []
	for (o of input.map(x => x.split(")").map(x => x.trim()))) {
		map[o[1]] = o[0];
		planets.push(o[1]);
	}

	let you = [map["YOU"]]
	let san = [map["SAN"]]
	while (!(san.includes(you[you.length - 1]) || you.includes(san[san.length - 1]))) {
		you.push(map[you[you.length - 1]])
		san.push(map[san[san.length - 1]])
	}
	if (san.includes(you[you.length - 1])) {
		for (let i = you.length - 1; i >= 0; i--) {
			if (san[i] == you[you.length - 1]) {
				return i + you.length - 1
			}
		}
	}
	if (you.includes(san[san.length - 1])) {
		for (let i = san.length - 1; i >= 0; i--) {
			if (you[i] == san[san.length - 1]) {
				return i + san.length - 1
			}
		}
	}
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;