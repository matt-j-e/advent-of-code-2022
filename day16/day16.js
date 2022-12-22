const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);

function buildGraph() {
  const graph = new Map();
  lines.forEach((line) => {
    const els = line.split(" ");
    const valves = [];
    for (let i = 9; i < els.length; i++) {
      valves.push(els[i].replace(",", ""));
    }
    graph.set(els[1], {
      rate: parseInt(els[4].split("=")[1].replace(";", "")),
      valves: valves,
    });
  });
  return graph;
}

console.log(buildGraph());
