const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
console.log(lines);

let x = 1;
let c = 0; // cycle

function cycle(val = null) {
  console.log(`Cycle ${c + 1} start: x = ${x}`);
  if (val) x += val;
  c += 1;
  console.log(`Cycle ${c} end: x = ${x}`);
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
