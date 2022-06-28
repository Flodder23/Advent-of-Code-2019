const test = require("../../tester");
const func = require("./solution");

const tests = [
	{
		params: `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`.split("\n").map(row => row.split("")),
		output: 132
	}, {
		params: `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`.split("\n").map(row => row.split("")),
		output: 136
	}, {
		params:`########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`.split("\n").map(row => row.split("")),
		output: 81
	}
];

test.testValues(func, tests);