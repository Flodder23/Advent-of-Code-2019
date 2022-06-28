const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n").map(x => x.split(","));

move = {
	"U": pos => pos[1] += 1,
	"R": pos => pos[0] += 1,
	"D": pos => pos[1] -= 1,
	"L": pos => pos[0] -= 1
}

function addWire(dir, len, pos, path, step) {
	let d = 0;
	while (d < len) {
		move[dir](pos);
		if (!(pos[0] in path)) {
			path[pos[0]] = {}
		}
		if (!(pos[1] in path[pos[0]])){
			path[pos[0]][pos[1]] = step + d
		}
		d += 1
	}
}

function checkPosOnPath(pos, path) {
//	console.log(pos, path)
	return pos[0] in path && pos[1] in path[pos[0]]
}

function run(path1, path2) {
	let c = [0, 0]
	let w1 = {}
	let len = 1
	for (let i of path1) {
		addWire(i[0], i.substr(1), c, w1, len);
		len += parseInt(i.substr(1), 10);
	}
	c = [0, 0];
	len = 1;
	let min;
	for (i of path2) {
		let d = 0;
		while (d < i.substr(1)) {
			move[i[0]](c);
			if (checkPosOnPath(c, w1) && (!min || w1[c[0]][c[1]] + len + d < min)) {
				min = w1[c[0]][c[1]] + len + d
			}
			d += 1
		}
		len += d
	}
	return min
}

if (require.main === module) {
	console.log(run(...input));
}

module.exports = run;