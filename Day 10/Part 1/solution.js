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

function log_sights(log, a, b) {
	log_sight(log, a);
	log_sight(log, b);
}


function run(map) {
	let can_see = {};
	for (let y = 0; y < map.length; y++) {
		for (let x=0; x < map[y].length; x++) {
			if (map[y][x] == "#") {
				for (let dy=0; dy < map.length - y; dy++) {
					for (let dx=-x; dx < map[y].length - x; dx++) {
						if (!(dy == 0 && dx != 1)) {
							if (gcd(Math.abs(dx), dy) == 1) {
								let ddx=1; let ddy=1;
								while (x + dx*ddx < map[y].length && y + dy*ddy < map.length) {
									if (map[y+dy*ddy][x+dx*ddx] == "#") {
										log_sights(can_see, [x, y], [x+dx*ddx, y+dy*ddy]);
										break;
									}
									ddx++; ddy++;
								}
							}
						}
					}
				}
			}
		}
	}
	console.log(can_see)
	return Math.max(...Object.entries(can_see).map(b => b = Object.entries(b[1]).map(c => c[1])).map(d => Math.max(...d)))
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;