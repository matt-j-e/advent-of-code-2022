const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
// console.log(lines);

let x = 1;
let c = 0; // cycle
let strengthsSum = 0;
function cycle(val = null) {
  // console.log(`Cycle ${c + 1} start: x = ${x}`);
  if ((c + 1 - 20) % 40 === 0) {
    console.log(`During cycle ${c + 1} signal strength = ${x * (c + 1)}`);
    strengthsSum += x * (c + 1);
  }
  if (val) x += val;
  c += 1;
  // console.log(`Cycle ${c} end: x = ${x}`);
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

console.log(`A: Sum of signal strengths = ${strengthsSum}`); //14360
