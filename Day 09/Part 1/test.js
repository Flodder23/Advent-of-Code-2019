const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
	// 	params: [[109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]],
	// 	output: "A copy of itself"
	// }, {
	// 	params : [[1102,34915192,34915192,7,4,7,99,0]],
	// 	output : "A 16-digit number"
	// }, {
	// 	params : [[104,1125899906842624,99]],
	// 	output : 1125899906842624
	// }, {
		params : [[9,3,203,-1,99]],
		output : ""
	}
];

test.testValues(func, tests);