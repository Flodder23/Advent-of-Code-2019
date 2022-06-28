const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("").map(x => parseInt(x, 10));

function run(signal, iterations=100) {
	let pat = [0, 1, 0, -1];
	for (i = 0; i < iterations; i++) {
		let new_signal = [];
		for (n = 0; n < signal.length; n++) {
			let s = 0;
			for (m = 0; m < signal.length; m++) {
				s += signal[m] * (pat[Math.floor((m + 1) / (n + 1)) % 4]);
			}
			new_signal.push(Math.abs(s)%10);
		}
		signal = new_signal;
	}
	return signal.join("").substring(0, 8);
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;