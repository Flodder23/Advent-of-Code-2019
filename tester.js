class Test {
	constructor(func, params, output) {
		this.func = func;
		this.params = params
		this.desired = output;
		this.actual = this.func(...params);
		this.success = this.desired === this.actual;
	}

	log(
		onSuccess={result:true, func:false, params:false, actual:false, desired:false},
		onFailure={result:true, func:false, params:true, actual:true, desired:true}
	) {
		let builder;
		if (this.success) {
			builder=onSuccess;
		} else {
			builder=onFailure;
		}
		let output = ""
		if (builder.result) {
			if (this.success) {
				output += "SUCCESS\n";
			} else {
				output += "FAILURE\n";
			}
		}
		if (builder.func) {
			output += `function: ${this.function.name}\n`;
		}
		if (builder.params) {
			output += `parameters: ${this.params.join(", ")}\n`;
		}
		if (builder.actual) {
			output += `returned: ${this.actual}\n`;
		}
		if (builder.desired) {
			output += `desired: ${this.desired}\n`;
		}
	console.log(output);
	return output;
	}
}

function testValues(
	func, values,
	onSuccess={result:true, func:false, params:false, actual:false, desired:false},
	onFailure={result:true, func:false, params:true, actual:true, desired:true}
	) {
	for (let i=0; i<values.length; i++) {
		new Test(func, values[i].params, values[i].output).log(onSuccess=onSuccess, onFailure=onFailure);
	}
}


module.exports = {Test: Test, testValues: testValues};