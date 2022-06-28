function test_requirements(i) {
	adjacent = false;
	fail = false;
	d = 10;
	while (i >= 1 && !fail) {
		prev_d = d;
		d = i % 10;
		if (d == prev_d) {
			adjacent = true;
		} else if (d > prev_d) {
			fail = true
		}
		i = Math.floor(i / 10);
	}
	return adjacent && !fail
}

function run(input) {
	total = 0;
	for (i=parseInt(input.split("-")[0], 10); i <= parseInt(input.split("-")[1], 10); i++) {
		if (test_requirements(i)) {
			total ++;
		}
	}
	return total
}

if (require.main === module) {
	console.log(run("382345-843167"));
}

module.exports = run;