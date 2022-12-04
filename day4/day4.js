const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
const pairs = lines.map((line) => line.split(","));

function elements(pair) {
  return {
    a1: Number(pair[0].split("-")[0]),
    a2: Number(pair[0].split("-")[1]),
    b1: Number(pair[1].split("-")[0]),
    b2: Number(pair[1].split("-")[1]),
  };
}

function isContained(pair) {
  const { a1, a2, b1, b2 } = elements(pair);
  if (a1 >= b1 && a2 <= b2) return 1;
  if (b1 >= a1 && b2 <= a2) return 1;
  return 0;
}

function isOverlapping(pair) {
  const { a1, a2, b1, b2 } = elements(pair);
  if ((a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2)) return 1;
  if ((b1 >= a1 && b1 <= a2) || (b2 >= a1 && b2 <= a2)) return 1;
  return 0;
}

let fullyContained = 0;
let overlapping = 0;

pairs.forEach((pair) => {
  fullyContained += isContained(pair);
  overlapping += isOverlapping(pair);
});

console.log("A: Number fully contained =", fullyContained); // 500
console.log("A: Number overlapping =", overlapping); // 815
