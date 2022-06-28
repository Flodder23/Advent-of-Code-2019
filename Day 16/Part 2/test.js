const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: ["03036732577212944063491565474664".split("").map(x => parseInt(x, 10))],
		output: "84462026"
	}, {
		params: ["02935109699940807407585447034323".split("").map(x => parseInt(x, 10))],
		output: "78725270"
	}, {
		params: ["03081770884921959731165446850517".split("").map(x => parseInt(x, 10))],
		output: "53553731"
	}
];

test.testValues(func, tests);