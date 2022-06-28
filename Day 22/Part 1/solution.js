const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function run(p, n, ret = null) {
	let pos = [];
	for (let i = 0; i < n; i++) {
		pos.push(i);
	}
	p = p.map(x => x.split(" "))
	p = p.map(x => [x[x.length - 2], x[x.length - 1]])
	for (s of p) {
		if (s[0] == "new") {
			for(let i = 0; i < n; i++) {
				pos[i] = (n - 1 - pos[i]) % n;
			}
		} else if (s[0] == "cut") {
			for(let i = 0; i < n; i++) {
				pos[i] = (n + pos[i] - parseInt(s[1], 10)) % n;
			}
		} else if (s[0] == "increment") {
			for(let i = 0; i < n; i++) {
				pos[i] = (pos[i] * parseInt(s[1], 10)) % n;
			}
		} else {
			throw ReferenceError(`${s} is an invalid instruction`);
		}
	}
	if (ret == null) {
		let deck = [];
		for(i = 0; i < n; i++) {
			deck[pos[i]] = i
		}
		return deck;
	} else {
		return pos[ret]
	}
}

if (require.main === module) {
	console.log(run(input, 10007, 2019));
}

module.exports = run;