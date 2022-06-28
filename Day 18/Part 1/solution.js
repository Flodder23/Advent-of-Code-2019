const fs = require("fs");
const input = fs.readFileSync("../input.txt", { encoding: "utf8" }).split("\n").map(row => row.split(""));

function run(maze) {
	adjacency = {}
	for (let y = 0; y < maze.length; y++) {
		for (let x = 0; x < maze[y].length; x++) {
			if (!(maze[y][x] == "." or maze[y][x] == "#")) {
				adjacency[maze[y][x]] = 
			}
		}
	}
}

if (require.main === module) {
	console.log(run(input));
}

module.exports = run;