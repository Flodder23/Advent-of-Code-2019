const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");

function run(input) {
	
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;