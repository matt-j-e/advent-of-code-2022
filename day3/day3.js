const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

const priorities = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const sumA = lines.reduce((acc, line) => {
  for (let i = 0; i < line.length / 2; i++) {
    if (line.substring(line.length / 2).includes(line[i])) {
      return acc + priorities[line[i]];
    }
  }
}, 0);

console.log("A: Sum of priorities =", sumA); // 7826

let sumB = 0;

for (let i = 0; i < lines.length; i += 3) {
  for (let j = 0; j < lines[i].length; j++) {
    if (
      lines[i + 1].includes(lines[i][j]) &&
      lines[i + 2].includes(lines[i][j])
    ) {
      sumB += priorities[lines[i][j]];
      break;
    }
  }
}

console.log("B: Sum of priorities =", sumB); // 2577
