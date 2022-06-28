const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split(",").map(x => parseInt(x, 10));
const Intcode = require("../../intcode");
var readlineSync = require("readline-sync");

function get_output(intcode) {
	let o = [];
	let a = intcode.run();
	while (a != 10) {
		o.push(a);
		a = intcode.run()
	}
	return o;
}

function to_ascii_values(str) {
	return str.split("").map(x => x.charCodeAt(0)).filter(x => x != 13);
}

function to_ascii_string(val) {
	return val.map(x => String.fromCharCode(x)).join("");
}

function run(intcode, self=false) {
	let commands;
	let explorer;
	if (self) {explorer = new Intcode(intcode)}
	else {
		commands = fs.readFileSync("path.txt", { encoding: "utf8" });
		explorer = new Intcode(intcode);
		commands = commands.split("\n");
	}
	let quit = false
	while (!(quit || explorer.quit)) {
		out = to_ascii_string(get_output(explorer));
		if (out == "Command?") {
			let command;
			if (self) {
				command = readlineSync.question(">>> ");
			} else {
				if (commands.length == 0) {
					command = "quit"
				} else {
					command = commands.shift();
				}
				console.log(`>>> ${command}`);
			}
			if (command == "quit") {
					quit = true;
				} 
			explorer.add_input(...to_ascii_values(command + "\n"));
		} else {
			console.log(out);
		}
	}
	if (quit) {
		let items = [
			"mutex",
			"spool of cat6",
			"hypercube",
			"astronaut ice cream",
			"boulder",
			"antenna",
			"sand",
			"mouse"
		];
		let in_inv = {
			"mutex": true,
			"spool of cat6": true,
			"hypercube": true,
			"astronaut ice cream": true,
			"boulder": true,
			"antenna": true,
			"sand": true,
			"mouse": true
		}
		let go_south = false;
		let i = 1;
		while (!explorer.quit) {
			let out = to_ascii_string(get_output(explorer))
			console.log(out);
			if (out == "Command?") {
				let command;
				if (go_south) {
					command = "south";
					go_south = false;
				} else {
					let n = 0;
					while (i % (2 ** n) == 0) {
						n++;
					}
					n--;
					if (in_inv[items[n]]) {
						command = `drop ${items[n]}`;
					} else {
						command = `take ${items[n]}`;
					}
					in_inv[items[n]] = !in_inv[items[n]];
					i++;
					go_south = true;
				}
				console.log(`>>> ${command}`);
				explorer.add_input(...to_ascii_values(command + "\n"));
				console.log(to_ascii_string(get_output(explorer)));
			}
		}
	}
}

if (require.main === module) {
	run(input);
}

module.exports = run;