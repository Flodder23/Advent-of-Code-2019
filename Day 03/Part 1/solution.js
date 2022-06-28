const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n").map(x => x.split(","));

move = {
	"U": pos => pos[1] += 1,
	"R": pos => pos[0] += 1,
	"D": pos => pos[1] -= 1,
	"L": pos => pos[0] -= 1
}

function addWire(dir, len, pos, path) {
	let d = 0;
	while (d < len) {
		move[dir](pos);
		if (pos[0] in path) {
			path[pos[0]].add(pos[1]);
		} else {
			path[pos[0]] = new Set([pos[1]]);
		}
		d += 1
	}
}

function checkPosOnPath(pos, path) {
	return pos[0] in path && path[pos[0]].has(pos[1])
}

function run(path1, path2) {
	let c = [0, 0]
	let w1 = {}
	for (let i of path1) {
		addWire(i[0], i.substr(1), c, w1);
	}
	c = [0, 0];
	let min;
	for (i of path2) {
		let d = 0;
		while (d < i.substr(1)) {
			move[i[0]](c);
			if (checkPosOnPath(c, w1)) {
				if (!min || Math.abs(c[0]) + Math.abs(c[1]) < min) {
					min = Math.abs(c[0]) + Math.abs(c[1]);
				}
			}
			d += 1
		}
	}
	return min;
}

if (require.main === module) {
	console.log(run(...input));
}

module.exports = run;