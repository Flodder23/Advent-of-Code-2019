const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: [[101,-1,7,7,4,7,1105,11,0,99], 5],
		output: "output 10,9,8,7,6,5,4,3,2,1"
	}, {
		params: [[1,0,3,3,1005,2,10,5,1,0,4,1,99], 5],
		output: "output 0"
	}
];

test.testValues(func, tests);