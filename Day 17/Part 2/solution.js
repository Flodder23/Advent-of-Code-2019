const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode")

function run(intcode) {
	intcode[0] = 2;
	bot = new Intcode(intcode);
	M = "A,A,B,C,B,C,B,C,A,C\n".split("").map(x =>x.charCodeAt(0));
	A = "R,6,L,8,R,8\n".split("").map(x =>x.charCodeAt(0));
	B = "R,4,R,6,R,6,R,4,R,4\n".split("").map(x =>x.charCodeAt(0));
	C = "L,8,R,6,L,10,L,10\n".split("").map(x =>x.charCodeAt(0));
	N = "n\n".split("").map(x =>x.charCodeAt(0));
	bot.add_input(...M, ...A, ...B, ...C, ...N);
	while (!bot.halt) {
		bot.run()
	}
	return bot.last_output;
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;