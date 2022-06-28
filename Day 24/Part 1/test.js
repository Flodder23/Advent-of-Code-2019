const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [`....#
#..#.
#..##
..#..
#....`.split("\n")],
		output: 2129920
	}
];

test.testValues(func, tests);