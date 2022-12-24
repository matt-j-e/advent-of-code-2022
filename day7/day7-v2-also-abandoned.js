// TO BE FAIR THIS MIGHT HAVE WORKED
// HAD I REALISED THAT THE SAME DIERCTORY
// NAME COULD BE USED MORE THAN ONCE
// ie. NESTED UNDER A DIFFERENT PARENT DIRECTORY

const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), false);
// console.log(lines);

const tree = new Map();
let currentNode;

lines.forEach(line => {
  if (line.startsWith("$ cd") && !line.endsWith("..")) {
    const nodeId = line.split(" ")[2];
    tree.set(nodeId, {type: 'd', size: 0, parent: currentNode, children: []});
    currentNode = nodeId;
  }

  if (!line.startsWith("$")) {
    const nodeId = line.split(" ")[1];
    const type = line.startsWith("dir") ? "d" : "f";
    if (type === 'f') {
      tree.set(nodeId, {type: 'f', size: parseInt(line.split(" ")[0]), parent: currentNode, children: []});
    } else {
      tree.set(nodeId, {type: 'd', size: 0, parent: currentNode, children: []});
    }
    tree.get(currentNode).children.push(nodeId)
  }

  if (line === "$ cd ..") {
    currentNode = tree.get(currentNode).parent;
  }
});

// console.log(tree);

function getDirSize(dir) {
  let dirSize = 0;
  tree.get(dir).children.forEach(child => {
    if (tree.get(child).type === 'f') {
      dirSize += tree.get(child).size
    } else {
      return dirSize += getDirSize(child)
    }
  });
  return dirSize;
}

for (const node of tree.keys()) {
  if (tree.get(node).type === 'd') {
    const currentNode = tree.get(node);
    currentNode.size += getDirSize(node);
    tree.set(node, currentNode);
  }
}

console.log(tree);
let smallDirsTotal = 0;
for (const node of tree.keys()) {
  const nodeSize = tree.get(node).size;
  const nodeType = tree.get(node).type;
  if (nodeType === 'd' && nodeSize <= 100000) {
    smallDirsTotal += nodeSize;
  }
}

console.log('A: Directories less then 100k total', smallDirsTotal); // 1495849 too low
let totalSize = 0;
for (const [k, v] of tree.entries()) {
  if (v.type == 'd' && v.size <= 100000) totalSize += v.size;
}
console.log(totalSize);