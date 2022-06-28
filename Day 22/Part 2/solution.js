const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function run(p, n, r) {
	p = p.reverse();
	p = p.map(x => x.split(" "));
	p = p.map(x => [x[x.length - 2], x[x.length - 1]]);
	for (s of p) {
		if (s[0] == "new") {
			//r = (n - 1 - r) % n;
			
		} else if (s[0] == "cut") {
				//r = (n + r - parseInt(s[1], 10)) % n;
		} else if (s[0] == "increment") {
				//r = (r * parseInt(s[1], 10)) % n;
		} else {
			throw ReferenceError(`${s} is an invalid instruction`);
		}
	}
	return r;
}

if (require.main === module) {
	console.log(run(input, 119315717514047, 2020));
}

module.exports = run;