const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [["1", "4", "3", "4", "95"]],
		output: [["1", "4", "3", "4", "99"]]
	}, {
		params: [["1002", "4", "3", "4", "33"]],
		output: [["1002", "4", "3", "4", "99"]]
	}, {
		params: [["3", "2", "0"]],
		output: [["3", "2", "1"]]
	}, {
		params: [["104", "2", "3", "0"]],
		output: "output 3"
	}
];

test.testValues(func, tests);