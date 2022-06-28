const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[1, 2, 3, 4, 5, 6, 7, 8], 4],
		output: "01029498"
	}, {
		params: ["80871224585914546619083218645595".split("").map(x => parseInt(x, 10))],
		output: "24176176"
	}, {
		params: ["19617804207202209144916044189917".split("").map(x => parseInt(x, 10))],
		output: "73745418"
	}, {
		params: ["69317163492948606335995924319873".split("").map(x => parseInt(x, 10))],
		output: "52432133"
	}
];

test.testValues(func, tests);