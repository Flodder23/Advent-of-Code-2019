const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L"]],
		output: 42
	}
];

test.testValues(func, tests);