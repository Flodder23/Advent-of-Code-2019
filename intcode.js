class Intcode {
	constructor(code, inputs=[], return_output=true) {
		this.code = code;
		this.return_output = return_output;
		this.last_output = undefined;
		this.relative_base = 0;
		this.pointer = 0;
		this.quit = false;
		this.halt = false;
		this.inputs = inputs;
		this.instruction = {
			1: {  //-- ADDITION --//
				params: 3,
				run: (a, b, c) => this.code[c] = this.code[a] + this.code[b]
			}, 2: {  //-- MULTIPLICATION --//
				params: 3,
				run: (a, b, c) => this.code[c] = this.code[a] * this.code[b]
			}, 3: {  //-- INPUT --//
				params: 1,
				run: a => this.code[a] = this.get_input()
			}, 4: {  //-- OUTPUT --//
				params: 1,
				run: (a) => this.give_output(this.code[a])
			}, 5: {  //-- JUMP IF NON-ZERO --//
				params: 2,
				run: (a, b) => this.pointer = (this.code[a] == 0 ? this.pointer : this.code[b] - 3)
			}, 6: {  //-- JUMP IF ZERO --//
				params: 2,
				run: (a, b) => this.pointer = (this.code[a] == 0 ? this.code[b] - 3 : this.pointer)
			}, 7: {  //-- IS LESS THAN --//
				params: 3,
				run: (a, b, c) => this.code[c] = +(this.code[a] < this.code[b])
			}, 8: {  //-- IS EQUAL TO --//
				params: 3,
				run: (a, b, c) => this.code[c] = +(this.code[a] == this.code[b])
			}, 9: {  //-- ADJUST RELATIVE BASE --//
				params: 1,
				run: a => this.relative_base += this.code[a]
			}, 99: { // -- HALT PROGRAM --//
				params: 0,
				run: () => this.halt = true
			}
		}
	}
	add_input(...inputs) {
		this.inputs.push(...inputs)
	}
	get_input() {
		if (this.inputs.length == 0) {
			throw ReferenceError("No inputs left");
		}
		return this.inputs.shift()
	}
	give_output(n) {
		this.last_output = n;
		if (this.return_output) {
			this.quit = true
		} else {
			console.log(this.last_output)
		}
	}
	get_params() {
		let i = this.code[this.pointer];
		let o = i % 100;
		i = Math.floor(i / 100);
		let params = [];
		for (let a = 0; a < this.instruction[o].params; a++) {
			let mode = i % 10;
			let p;
			if (mode == 0) {
				p = this.code[this.pointer + 1 + a]
			} else if (mode == 1) {
				p = this.pointer + 1 + a
			} else if (mode == 2) {
				p = this.relative_base + this.code[this.pointer + 1 + a]
			} else {
				throw ReferenceError(`The value ${mode} is not a valid parameter mode`)
			}
			if (typeof(this.code[p]) == "undefined") {
				this.code[p] = 0;
			}
			params.push(p);
			i = Math.floor(i / 10);
		}
		return params;
	}
	run() {
		while (!(this.quit || this.halt)) {
			let i = this.code[this.pointer] % 100
			if (!Object.keys(this.instruction).includes(i.toString(10))) {
				throw ReferenceError(`${i} is not a valid instruction`)
			}
			let params = this.get_params()
			this.instruction[i].run(...params);
			this.pointer += 1 + params.length;
		}
		this.quit = false;
		return this.last_output;
	}
}

module.exports = Intcode;