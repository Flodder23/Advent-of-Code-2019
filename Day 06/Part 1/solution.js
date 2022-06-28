const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function get_orbits(planet, map) {
	if (map[planet]) {
		return 1 + get_orbits(map[planet], map);
	} else {
		return 0;
	}
}

function run(input) {
	let map = {}
	let planets = []
	for (o of input.map(x => x.split(")").map(x => x.trim()))) {
		map[o[1]] = o[0];
		planets.push(o[1]);
	}
	let total = 0;
	for (p of planets) {
		total += get_orbits(p, map);
	}
	return total
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;