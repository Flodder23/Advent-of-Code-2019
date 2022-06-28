const fs = require("fs");

class Moon {
	constructor(pos, vel=[0, 0, 0]) {
		this.pos = pos;
		this.vel = vel;
	}
	applyGravity(...moons) {
		for (let m of moons) {
			for (let i = 0; i < 3; i++) {
				if (m.pos[i] > this.pos[i]) {
					this.vel[i]++
				} else if (m.pos[i] < this.pos[i]) {
					this.vel[i]--
				}
			}
		}
	}
	applyVelocity() {
		for (let i = 0; i < 3; i++) {
			this.pos[i] += this.vel[i];
		}
	}
	getPotentialEnergy() {
		e = 0;
		for (let i = 0; i < 3; i++) {
			e += Math.abs(this.pos[i])
		}
		return e;
	}
	getKineticEnergy() {
		e = 0;
		for (let i = 0; i < 3; i++) {
			e += Math.abs(this.vel[i])
		}
		return e;
	}
	getTotalEnergy() {
		return this.getPotentialEnergy() * this.getKineticEnergy();
	}
}

function run() {
	Io = new Moon([17, -12, 13]);
	Europa = new Moon([2, 1, 1]);
	Ganymede = new Moon([-1, -17, 7]);
	Callisto = new Moon([12, -14, 18]);

	// Io = new Moon([-1, 0, 2]);
	// Europa = new Moon([2, -10, -7]);
	// Ganymede = new Moon([4, -8, 8]);
	// Callisto = new Moon([3, 5, -1]);

	// Io = new Moon([-8, -10, 0]);
	// Europa = new Moon([5, 5, 10]);
	// Ganymede = new Moon([2, -7, 3]);
	// Callisto = new Moon([9, -8, -3]);

	for (let i = 0; i < 1000; i++) {
		Io.applyGravity(Europa, Ganymede, Callisto)
		Europa.applyGravity(Io, Ganymede, Callisto)
		Ganymede.applyGravity(Io, Europa, Callisto)
		Callisto.applyGravity(Io, Europa, Ganymede)

		Io.applyVelocity()
		Europa.applyVelocity()
		Ganymede.applyVelocity()
		Callisto.applyVelocity()

	}
	e = 0;
	e += Io.getTotalEnergy()
	e += Europa.getTotalEnergy()
	e += Ganymede.getTotalEnergy()
	e += Callisto.getTotalEnergy()
	return e;
}

if (require.main === module) {
	console.log(run());
}

module.exports = run;