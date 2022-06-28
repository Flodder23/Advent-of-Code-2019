const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[14]],
		output: 2
	}, {
		params: [[1969]],
		output: 966
	}, {
		params: [[100756]],
		output: 50346
	}, {
		params:[[14, 1969, 100756]],
		output: 2 + 966 + 50346
	}
];

test.testValues(func, tests);