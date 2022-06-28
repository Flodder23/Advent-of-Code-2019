const fs = require("fs");

function applyGravity(d, ...moons) {
	for (let a = 0; a < 4; a++) {
		for (let b = a + 1; b < 4; b++) {
			if (moons[a].pos[d] < moons[b].pos[d]) {
				moons[a].vel[d]++;
				moons[b].vel[d]--;
			}
			else if (moons[a].pos[d] > moons[b].pos[d]) {
				moons[a].vel[d]--;
				moons[b].vel[d]++;
			}
		}
	}
}

function applyVelocity(d, ...moons) {
	for (let m of moons) {
		m.pos[d] += m.vel[d];
	}
}

function getKineticEnergy(d, ...moons) {
	e = 0;
	for (let m of moons) {
		e += Math.abs(m.vel[d])
	}
	return e;
}

function run() {
	let Io = {
		pos: [17, -12, 13],
		vel: [0, 0, 0],
		start: [17, -12, 13]
	}
	let Europa = {
		pos: [2, 1, 1],
		vel: [0, 0, 0],
		start: [2, 1, 1]
	}
	let Ganymede = {
		pos: [-1, -17, 7],
		vel: [0, 0, 0],
		start: [-1, -17, 7]
	}
	let Callisto = {
		pos: [12, -14, 18],
		vel: [0, 0, 0],
		start: [12, -14, 18]
	}

	// let Io = {
	// 	pos: [-1, 0, 2],
	// 	vel: [0, 0, 0],
	// 	start: [-1, 0, 2]
	// }
	// let Europa = {
	// 	pos: [2, -10, -7],
	// 	vel: [0, 0, 0],
	// 	start: [2, -10, -7]
	// }
	// let Ganymede = {
	// 	pos: [4, -8, 8],
	// 	vel: [0, 0, 0],
	// 	start: [4, -8, 8]
	// }
	// let Callisto = {
	// 	pos: [3, 5, -1],
	// 	vel: [0, 0, 0],
	// 	start: [3, 5, -1]
	// }

	// let Io = {
	// 	pos: [-8, -10, 0],
	// 	vel: [0, 0, 0],
	// 	start: [-8, -10, 0]
	// }
	// let Europa = {
	// 	pos: [5, 5, 10],
	// 	vel: [0, 0, 0],
	// 	start: [5, 5, 10]
	// }
	// let Ganymede = {
	// 	pos: [2, -7, 3],
	// 	vel: [0, 0, 0],
	// 	start: [2, -7, 3]
	// }
	// let Callisto = {
	// 	pos: [9, -8, -3],
	// 	vel: [0, 0, 0],
	// 	start: [9, -8, -3]
	// }

	let mins = [null, null, null];
	for (let i = 0; mins[0] == null || mins[1] == null || mins[2] == null; i++) {
		for (let d = 0; d < 3; d++) {
			if (mins[d] == null) {
				applyGravity(d, Io, Europa, Ganymede, Callisto)
				if (getKineticEnergy(d, Io, Europa, Ganymede, Callisto) == 0) {
					mins[d] = (i + 1) * 2;
				} else {
					applyVelocity(d, Io, Europa, Ganymede, Callisto);
				}
			}
		}
	}
	console.log("Answer if LCM of these numbers: ", mins)

}

if (require.main === module) {
	run();
}

module.exports = run;