const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

const monkeys = {};

function monkeyFunction(str) {
  const monkey1 = str.substring(0, 4);
  const monkey2 = str.substring(7);
  const sym = str.substring(5, 6);
  if (sym === "+") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() + monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() + monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] + monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] + monkeys[monkey2];
    };
  }
  if (sym === "-") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() - monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() - monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] - monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] - monkeys[monkey2];
    };
  }
  if (sym === "*") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() * monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() * monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] * monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] * monkeys[monkey2];
    };
  }
  if (sym === "/") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() / monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() / monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] / monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] / monkeys[monkey2];
    };
  }
}


lines.forEach((line) => {
  const parts = line.split(": ");
  if (!isNaN(Number(parts[1]))) {
    monkeys[parts[0]] = Number(parts[1]);
  } else {
    monkeys[parts[0]] = monkeyFunction(parts[1]);
  }
});

console.log("A: The monkey named Root will yell:", monkeys.root()); // 145167969204648

let low = 0
let high = 145_167_969_204_648
while(true) {
  let h = Math.ceil((high - low) / 2 + low);
  lines.forEach(line => {
    const parts = line.split(": ");
    // if (parts[0] === 'root') parts[1] = 'pppw - sjmn'; // test
    if (parts[0] === 'root') parts[1] = 'bjgs - tjtt'; // actual input
    if (parts[0] === 'humn') parts[1] = h;
    if (!isNaN(Number(parts[1]))) {
      monkeys[parts[0]] = Number(parts[1]);
    } else {
      monkeys[parts[0]] = monkeyFunction(parts[1]);
    }
  });
  if (monkeys.root() === 0) {
    console.log('B: You yell:', h); // 3330805295850
    break;
  }
  monkeys.root() > 0 ? low = h : high = h;
}
