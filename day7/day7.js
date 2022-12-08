const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), true);

class TreeNode {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.children = [];
  }
}

console.log(lines);
const nodes = [];
nodes.push(new TreeNode("/", "d"));
let addingChildren = false;
let currentNode = "/";
console.log(">>>>>>>>>>", nodes);
// lines.forEach((line) => {
//   if (line.startsWith("$")) addingChildren = false;
//   if (line.startsWith("$ cd") && !line.endsWith("..")) {
//     const id = line.split(" ")[2];
//     nodes.push();
//   }
// });
