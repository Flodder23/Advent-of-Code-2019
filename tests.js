function flip() {
	x = Math.floor(Math.random() * 2);
	if(x == 1) {
		return "heads";
	} else {
		return "tails";
	}
}

for (let i = 0; i < 10; i++) {
	console.log(flip());
}