const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("").map(x => parseInt(x, 10));

// To simplify the problem, take the last element of the signal.
// It stays the same throughout all iterations.
// Simlilairly, the second-to-last element is always the
// last element + what the second-to-last element was last iteration.
// In general, signal[n-1] = old_signal[n-1] + signal[n] + ...
// which can be worked out inductively starying from the last value.

function run(signal) {
	let output_location = parseInt(signal.slice(0, 7).join(""), 10);
	let old_signal = signal;
	signal = Array(signal.length * 10000 + 1 - output_location).fill(0);
	for (i = 0; i < signal.length; i++) {
		signal[i] = old_signal[(i + output_location) % old_signal.length]
	}
	for (let i = 0; i < 100; i++) {
		for (let j = signal.length - 2; j >= 0; j--) {
			signal[j] = ((signal[j] + signal[j + 1]) % 10);
		}
	}
	return signal.slice(0, 8).join("");
}


if (require.main === module) {
	console.log(run(input));
}

module.exports = run;