const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[12]],
		output: 2
	}, {
		params: [[14]],
		output: 2
	}, {
		params: [[1969]],
		output: 654
	}, {
		params: [[100756]],
		output: 33583
	}, {
		params:[[12, 14, 1969, 100756]],
		output: 2 + 2 + 654 + 33583
	}
];

test.testValues(func, tests);