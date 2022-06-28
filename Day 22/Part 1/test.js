const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [["deal into new stack"], 10],
		output: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
	}, {
		params: [["cut 3"], 10],
		output: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
	}, {
		params: [["cut -4"], 10],
		output: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]
	}, {
		params: [["deal with increment 3"], 10],
		output: [0, 7, 4, 1, 8, 5, 2, 9, 6, 3]
	}, {
		params: [
			[
				"deal with increment 7",
				"deal into new stack",
				"deal into new stack"
			],
			10
		],
		output: [0, 3, 6, 9, 2, 5, 8, 1, 4, 7]
	}, {
		params: [
			[
				"cut 6",
				"deal with increment 7",
				"deal into new stack"
			],
			10
		],
		output: [3, 0, 7, 4, 1, 8, 5, 2, 9, 6]
	}, {
		params: [
			[
				"deal with increment 7",
				"deal with increment 9",
				"cut -2"
			],
			10
		],
		output: [6, 3, 0, 7, 4, 1, 8, 5, 2, 9]
	}, {
		params: [
			[
				"deal into new stack",
				"cut -2",
				"deal with increment 7",
				"cut 8",
				"cut -4",
				"deal with increment 7",
				"cut 3",
				"deal with increment 9",
				"deal with increment 3",
				"cut -1"
			],
			10
		],
		output: [9, 2, 5, 8, 1, 4, 7, 0, 3, 6]
	}
];

test.testValues(func, tests);