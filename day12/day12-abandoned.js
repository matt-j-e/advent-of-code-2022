const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
const grid = lines.map((line) => line.split(""));
const maxR = grid.length;
const maxC = grid[0].length;
const costs = new Map();
const parents = new Map();
const startNode = "0,0";
const endNode = "2,5";

function getNeighbours(node) {
  const neighbours = [];
  // for (let r = -1; r < 2; r++) {
  //   for (let c = -1; c < 2; c++) {
  //     if (r === 0 && c === 0) continue;
  //     neighbours.push(`${node[0] + r},${node[1] + c}`);
  //   }
  // }
  neighbours.push(`${node[0] - 1},${node[1]}`);
  neighbours.push(`${node[0] + 1},${node[1]}`);
  neighbours.push(`${node[0]},${node[1] - 1}`);
  neighbours.push(`${node[0]},${node[1] + 1}`);
  return neighbours.filter((n) => {
    return (
      n.split(",")[0] >= 0 &&
      n.split(",")[0] < maxR &&
      n.split(",")[1] >= 0 &&
      n.split(",")[1] < maxC
    );
  });
}

function getValidMoves(node) {
  const neighbours = getNeighbours(node);
  // console.log(`Neighbours`, neighbours);
  return neighbours.filter((n) => {
    const nodeChar = grid[node[0]][node[1]];
    const nodeVal = nodeChar === "S" ? 97 : nodeChar.charCodeAt(0);
    const nChar = grid[n.split(",")[0]][n.split(",")[1]];
    const nVal =
      nChar === "E"
        ? 122
        : grid[n.split(",")[0]][n.split(",")[1]].charCodeAt(0);
    return nVal <= nodeVal + 1 && nVal !== 69;
  });
}

function buildGraph() {
  const graph = new Map();
  for (let r = 0; r < maxR; r++) {
    for (let c = 0; c < maxC; c++) {
      // graph.set(`${r},${c}`, getNeighbours([r, c]));
      graph.set(`${r},${c}`, getValidMoves([r, c]));
    }
  }
  return graph;
}

const graph = buildGraph();

graph.get(startNode).forEach((node) => {
  costs.set(node, 1);
  parents.set(node, startNode);
});

console.log("Costs after adding startNode", costs);

const processed = [];

function findLowestCostNode(costs) {
  let lowestCost = Number.POSITIVE_INFINITY;
  let lowestCostNode = null;
  costs.forEach((cost, node) => {
    console.log("Cost:", cost);
    console.log("Node:", node);
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestCostNode = node;
    }
  });
  return lowestCostNode;
}

let node = findLowestCostNode(costs);
while (node) {
  const nodeCost = costs.get(node);
  const neighbours = graph.get(node);
  console.log("Neighbours:", neighbours);
  neighbours.forEach((neighbour) => {
    console.log(">>>> NEIGHBOURS >>>>>");
    console.log(("Neighbour:", neighbour));
    let newNodeCost = nodeCost + 1;
    if (costs.get(neighbour) > newNodeCost) {
      costs.set(neighbour, newNodeCost);
      parents.set(neighbour, node);
    }
  });
  processed.push(node);
  node = findLowestCostNode(costs);
}

console.log(parents);
