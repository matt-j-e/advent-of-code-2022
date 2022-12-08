const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), true);
console.log(lines);

class TreeNode {
  constructor(id, type, size = 0) {
    this.id = id;
    this.type = type;
    this.size = size;
    this.children = [];
  }
}

const nodes = [];
let currentNode;
lines.forEach((line) => {
  const currentNodeIndex = nodes.findIndex((node) => node.id === currentNode);
  if (line.startsWith("$ cd") && !line.endsWith("..")) {
    const id = line.split(" ")[2];
    nodes.push(new TreeNode(id, "d"));
    currentNode = id;
  }
  if (!line.startsWith("$")) {
    const id = line.split(" ")[1];
    const type = line.startsWith("dir") ? "d" : "f";
    if (type === "f") {
      nodes.push(new TreeNode(id, type, line.split(" ")[0]));
    } else {
      nodes.push(new TreeNode(id, type));
    }
    nodes[currentNodeIndex].children.push(id);
  }
  if (line === "$ cd ..") {
    const parentIndex = nodes.findIndex((node) =>
      node.children.includes(nodes[currentNodeIndex].id)
    );
    currentNode = nodes[parentIndex].id;
  }
});

// console.log(nodes);

const dirNodes = nodes.filter((node) => node.children.length > 0);

console.log(dirNodes);

const dirSizes = [];
function getDirSize(children) {
  let dirSize = 0;
  children.forEach((child) => {
    const childIndex = nodes.findIndex((node) => node.id === child);
    if (nodes[childIndex].children.length > 0)
      dirSize = getDirSize(nodes[childIndex].children);
    dirSize += parseInt(nodes[childIndex].size);
  });
  return dirSize;
}

dirNodes.forEach((node) => dirSizes.push(getDirSize(node.children)));

console.log("dirSizes", dirSizes);
console.log(
  "Dirs < 100k",
  dirSizes
    .filter((size) => size <= 100000)
    .reduce((total, curr) => total + curr)
);
