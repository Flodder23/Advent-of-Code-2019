const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n");
const gcd = function(a, b) {
	if (b == 0) {
		return a;
	}

	return gcd(b, a % b);
}

function log_sight(log, a) {
	if (typeof log[a[0]] == "undefined") {
		log[a[0]] = {}
	}
	if (typeof log[a[0]][a[1]] == "undefined") {
		log[a[0]][a[1]] = 1
	} else {
		log[a[0]][a[1]] ++
	}
}


function run(map, centre) {
	let x = centre[0]; let y = centre[1];
	asteroids = {}
	angles = []
	for (let y1 = 0; y1 < map.length; y1++) {
		for (let x1 = 0; x1 < map[y].length; x1++) {
			if (map[y1][x1] == "#" && !(x1 == x && y1 == y)) {
				let a;
				if (x1 == x) {
					if (y1 > y) {
						a = Math.PI
					} else if (y1 < y) {
						a = 0
					}
				} else if (y1 == y) {
					if (x1 > x) {
						a = Math.PI / 2
					} else if (x1 < x) {
						a = 3 * Math.PI / 2
					}
				} else {
					if (x1 > x) {
						if (y1 < y) {
							a = Math.atan((x1 - x)/(y - y1))
						} else {  // y1 > y
							a = Math.PI / 2 + Math.atan((y1 - y)/(x1 - x))
						}
					} else {  // x1 < x
						if (y1 > y) {
							a = Math.PI + Math.atan((x - x1)/(y1 - y))
						} else {  // y1 < y
							a = 3 * Math.PI / 2 + Math.atan((y - y1)/(x - x1))
						}
					}
				}
				if (!angles.includes(a)) {
					angles.push(a);
					asteroids[a] = [[x1, y1]];
				} else {
					asteroids[a].push([x1, y1])
				}
			}
		}
	}
	angles.sort()
	const hypo = (c) => Math.pow((c[0] - x), 2) + Math.pow((c[1] - y), 2)
	for (a of angles) {
		asteroids[a].sort((b, c) => hypo(b) - hypo(c))
	}

	let destroyed = 0;
	while (angles.length > 0) {
		d = []
		for (a of angles) {
			destroyed ++;
			console.log(destroyed, asteroids[a][0])
			asteroids[a].splice(0, 1);
			if (asteroids[a].length == 0) {
				d.push(a)
			}
		}
		angles = angles.filter(e => !d.includes(e));
	}
}

if (require.main === module) {
	console.log(run(input, [23, 20]));
}

module.exports = run;