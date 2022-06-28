const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\r");

function getOre(toMake, reacts, spare) {
	if (toMake[1] == "ORE") {
		return toMake[0]
	}
	let t = 0;
	let m = spare[toMake[1]];
	while (m < toMake[0]) {
		for (r of reacts[toMake[1]][1]) {
			t += getOre(r, reacts, spare)
		}
		m += reacts[toMake[1]][0]
	}
	spare[toMake[1]] = m - toMake[0];
	return t;
}

function run(reactions) {
	let reacts = {};
	let spare = {};
	for (r of reactions) {
		r = r.split(" => ")
		chem = r[1].split(" ");
		chem[0] = parseInt(chem[0], 10)
		comp = r[0].split(", ").map(x => x.split(" ")).map(y => y = [parseInt(y[0], 10), y[1]]);

		reacts[chem[1]] = [chem[0], comp]
		spare[chem[1]] = 0;
	}
	return getOre([3568888, "FUEL"], reacts, spare);
}

if (require.main === module){
	console.log(run(input));
}

module.exports = run;