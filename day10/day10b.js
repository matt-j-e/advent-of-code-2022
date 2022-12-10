const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

let x = 1;
let c = 0; // cycle
let output = "";

function cycle(val = null) {
  const row = Math.floor((c + 1) / 40);
  const pixel = [x + row * 40 - 1, x + row * 40, x + row * 40 + 1];
  if (pixel.includes(c)) {
    output += "#";
  } else {
    output += ".";
  }
  if ((c + 1) % 40 === 0) output += "\n";
  if (val) x += val;
  c += 1;
}

while (lines.length > 0) {
  const line = lines.shift();
  const instr = line.substring(0, 4);
  if (instr === "noop") {
    cycle();
  }
  if (instr === "addx") {
    cycle();
    cycle(parseInt(line.substring(5)));
  }
}

console.log(output); // BGKAEREZ
