const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
const matrix = lines.map((line) => line.split(""));
const maxR = matrix.length;
const maxC = matrix[0].length;
const graph = new Map();
const costs = new Map();
const parents = new Map();

function findNode(target) {
  for (let r = 0; r < maxR; r++) {
    for (let c = 0; c < maxC; c++) {
      if (matrix[r][c] === target) return `${r},${c}`;
    }
  }
}

const startNode = findNode("S");
const endNode = findNode("E");

function isValidMove(fromNode, toNode) {
  if (
    fromNode[0] === parseInt(startNode.split(",")[0]) &&
    fromNode[1] === parseInt(startNode.split(",")[1])
  )
    return true;
  const fromCharVal = matrix[fromNode[0]][fromNode[1]].charCodeAt(0);
  const toChar = matrix[toNode[0]][toNode[1]];
  const toCharVal = toChar === "E" ? 122 : toChar.charCodeAt(0);
  return toCharVal <= fromCharVal + 1;
}

for (let r = 0; r < maxR; r++) {
  for (let c = 0; c < maxC; c++) {
    graph.set(`${r},${c}`, new Map());
    costs.set(`${r},${c}`, Number.POSITIVE_INFINITY);
    parents.set(`${r},${c}`, null);
    if (r > 0) {
      if (isValidMove([r, c], [r - 1, c]))
        graph.get(`${r},${c}`).set(`${r - 1},${c}`, 1);
    }
    if (c > 0) {
      if (isValidMove([r, c], [r, c - 1]))
        graph.get(`${r},${c}`).set(`${r},${c - 1}`, 1);
    }
    if (r < maxR - 1) {
      if (isValidMove([r, c], [r + 1, c]))
        graph.get(`${r},${c}`).set(`${r + 1},${c}`, 1);
    }
    if (c < maxC - 1) {
      if (isValidMove([r, c], [r, c + 1]))
        graph.get(`${r},${c}`).set(`${r},${c + 1}`, 1);
    }
  }
}

graph.get(startNode).forEach((value, node) => {
  costs.set(node, value);
  parents.set(node, startNode);
});

const processed = [];

function findLowestCostNode(costs) {
  let lowestCost = Number.POSITIVE_INFINITY;
  let lowestCostNode = null;
  costs.forEach((cost, node) => {
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
  neighbours.forEach((cost, neighbour) => {
    const newNodeCost = nodeCost + cost;
    if (costs.get(neighbour) > newNodeCost) {
      costs.set(neighbour, newNodeCost);
      parents.set(neighbour, node);
    }
  });
  processed.push(node);
  node = findLowestCostNode(costs);
}

console.log(`A: Fewest steps to best signal = ${costs.get(endNode)}`); // 425 (took just over a minute to compute!)
