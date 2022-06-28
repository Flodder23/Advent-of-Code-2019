const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[1,9,10,3,2,3,11,0,99,30,40,50]],
		output: 3500
	}, {
		params: [[1,0,0,0,99]],
		output: 2
	}, {
		params: [[2,3,0,3,99]],
		output: 2
	}, {
		params: [[2,4,4,5,99,0]],
		output: 2
	}, {
		params: [[1,1,1,4,99,5,6,0,99]],
		output: 30
	}
];

test.testValues(func, tests);