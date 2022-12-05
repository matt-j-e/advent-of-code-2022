const test = [[], ["Z", "N"], ["M", "C", "D"], ["P"]];
const input = [
  [],
  ["F", "D", "B", "Z", "T", "J", "R", "N"],
  ["R", "S", "N", "J", "H"],
  ["C", "R", "N", "J", "G", "Z", "F", "Q"],
  ["F", "V", "N", "G", "R", "T", "Q"],
  ["L", "T", "Q", "F"],
  ["Q", "C", "W", "Z", "B", "R", "G", "N"],
  ["F", "C", "L", "S", "N", "H", "M"],
  ["D", "N", "Q", "M", "T", "J"],
  ["P", "G", "S"],
];
const stacks = input;
const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

lines.forEach((line) => {
  const instr = line.split(" ");
  const num = parseInt(instr[1]);
  const from = parseInt(instr[3]);
  const to = parseInt(instr[5]);
  const spliceStart = stacks[from].length - num;
  const shiftStack = stacks[from].splice(spliceStart, num);
  stacks[to] = [...stacks[to], ...shiftStack];
});
const message = stacks.map((stack) => stack.pop()).join("");
console.log("B: Message =", message); // GGNPJBTTR
