const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), false);

const currentPathNodes = [];
const sizes = new Map();

lines.forEach(line => {
  if (line.startsWith("$ cd") && !line.endsWith("..")) {
    const nodeId = line.split(" ")[2];
    const pathPrefix = currentPathNodes.length > 0 ? currentPathNodes[currentPathNodes.length - 1] + "/" : "";
    const path = pathPrefix  +nodeId;
    currentPathNodes.push(path);
    sizes.set(path, 0);
  }

  if (!line.startsWith("$")) {
    const type = line.startsWith("dir") ? "d" : "f";
    if (type === "f") {
      currentPathNodes.forEach(node => {
        sizes.set(node, sizes.get(node) + parseInt(line.split(" ")[0]))
      });
    }
  }

  if (line === "$ cd ..") {
    currentPathNodes.pop()
  }
});

let smallDirsTotal = 0;
const largeDirs = [];
for (const [k, v] of sizes.entries()) {
  if (v <= 100000) {
    smallDirsTotal += v;
    console.log(k, v)
  }
  if (v >= 30000000 - (70000000 - 41609574)) {
    largeDirs.push(v);
  }
}
console.log('A: Directories less then 100k total', smallDirsTotal); // 1778099

console.log(sizes.get('/'))

console.log('B: Smallest directory that frees up sufficient space has size:', largeDirs.sort((a, b) => a - b)[0]); // 1623571