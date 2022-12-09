const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

let hCoords = [5, 1]; // row, col
let tCoords = [...hCoords];
const tNodes = [[...tCoords]];

function areTouching(h, t) {
  const matchedNodes = getSurroundingBlock(h).filter(
    (node) => node[0] === t[0] && node[1] === t[1]
  );
  return matchedNodes.length > 0;
}

function getSurroundingBlock(coords) {
  return [
    [coords[0] - 1, coords[1] - 1],
    [coords[0] - 1, coords[1]],
    [coords[0] - 1, coords[1] + 1],
    [coords[0], coords[1] - 1],
    [coords[0], coords[1]],
    [coords[0], coords[1] + 1],
    [coords[0] + 1, coords[1] - 1],
    [coords[0] + 1, coords[1]],
    [coords[0] + 1, coords[1] + 1],
  ];
}

function takeSteps(dir, num) {
  for (let i = 0; i < num; i++) {
    const oldHeadCoords = [...hCoords];
    if (dir === "U") hCoords[0]--;
    if (dir === "D") hCoords[0]++;
    if (dir === "L") hCoords[1]--;
    if (dir === "R") hCoords[1]++;
    if (!areTouching(hCoords, tCoords)) {
      tCoords = [...oldHeadCoords];
      tNodes.push([...tCoords]);
    }
  }
}

lines.forEach((line) => {
  takeSteps(line.split(" ")[0], line.split(" ")[1]);
});
const nodesAsStrings = tNodes.map((node) => node.join());
const uniqueNodes = new Set(nodesAsStrings);
console.log("A: Tail positions =", uniqueNodes.size); // 6745
