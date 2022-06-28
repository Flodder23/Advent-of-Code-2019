const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [["COM)B", "B)C", "C)D", "D)E", "E)F", "B)G", "G)H", "D)I", "E)J", "J)K", "K)L", "K)YOU", "I)SAN"]],
		output: 4
	}
];

test.testValues(func, tests);