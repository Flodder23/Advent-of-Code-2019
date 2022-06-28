const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[
			".#..#",
			".....",
			"#####",
			"....#",
			"...##"].map(a => a.split(""))],
		output: 8
	}
];

test.testValues(func, tests);