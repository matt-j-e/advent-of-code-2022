const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

function partOneResult(play) {
  const outcome = new Map();
  outcome.set("A X", 1 + 3);
  outcome.set("A Y", 2 + 6);
  outcome.set("A Z", 3 + 0);
  outcome.set("B X", 1 + 0);
  outcome.set("B Y", 2 + 3);
  outcome.set("B Z", 3 + 6);
  outcome.set("C X", 1 + 6);
  outcome.set("C Y", 2 + 0);
  outcome.set("C Z", 3 + 3);
  return outcome.get(play);
}
function partTwoResult(play) {
  const outcome = new Map();
  outcome.set("A X", 0 + 3);
  outcome.set("A Y", 3 + 1);
  outcome.set("A Z", 6 + 2);
  outcome.set("B X", 0 + 1);
  outcome.set("B Y", 3 + 2);
  outcome.set("B Z", 6 + 3);
  outcome.set("C X", 0 + 2);
  outcome.set("C Y", 3 + 3);
  outcome.set("C Z", 6 + 1);
  return outcome.get(play);
}

console.log(
  "A: Total score:",
  lines.reduce((acc, line) => (acc += partOneResult(line)), 0)
); // 13221

console.log(
  "B: Total score:",
  lines.reduce((acc, line) => (acc += partTwoResult(line)), 0)
); // 13131
