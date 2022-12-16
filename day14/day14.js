const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);
let maxC = 0;
let maxR = 0;
console.log(lines);

function createEmptyMatrix() {
  lines.forEach((line) => {
    const nodes = line.split(" -> ");
    nodes.forEach((node) => {
      coords = node.split(",");
      maxC = parseInt(coords[0]) > maxC ? parseInt(coords[0]) : maxC;
      maxR = parseInt(coords[1]) > maxR ? parseInt(coords[1]) : maxR;
    });
  });
  console.log("maxR", maxR, "maxC", maxC);
  return helpers.create2DArrayOfDots(maxR + 2, maxC + 2);
}

function addCaveStructure(matrix) {
  while (lines.length > 0) {
    const line = lines.shift();
    console.log(line);
    const nodes = line.split(" -> ");
    console.log("Nodes", nodes);
    for (let n = 0; n < nodes.length - 1; n++) {
      const node1row = parseInt(nodes[n].split(",")[1]);
      const node1col = parseInt(nodes[n].split(",")[0]);
      const node2row = parseInt(nodes[n + 1].split(",")[1]);
      const node2col = parseInt(nodes[n + 1].split(",")[0]);
      for (
        let r = Math.min(node1row, node2row);
        r < Math.max(node1row, node2row) + 1;
        r++
      ) {
        for (
          let c = Math.min(node1col, node2col);
          c < Math.max(node1col, node2col) + 1;
          c++
        ) {
          matrix[r][c] = "#";
        }
      }
    }
  }
}

let FLOWING = true;
function addGrain(r = 0, c = 500) {
  let coords = { r: r, c: c };
  if (canMoveDown(coords)) {
    coords.r++;
    addGrain(coords.r, coords.c);
  } else if (canMoveDownLeft(coords)) {
    coords.r++;
    coords.c--;
    addGrain(coords.r, coords.c);
  } else if (canMoveDownRight(coords)) {
    coords.r++;
    coords.c++;
    addGrain(coords.r, coords.c);
  } else {
    matrix[coords.r][coords.c] = "o";
    if (r > maxR - 1) FLOWING = false;
  }
}

function canMoveDown(coords) {
  return coords.r < maxR && matrix[coords.r + 1][coords.c] === ".";
}

function canMoveDownLeft(coords) {
  return coords.r < maxR && matrix[coords.r + 1][coords.c - 1] === ".";
}

function canMoveDownRight(coords) {
  return coords.r < maxR && matrix[coords.r + 1][coords.c + 1] === ".";
}

const matrix = createEmptyMatrix();
addCaveStructure(matrix);
let count = 0;
while (FLOWING) {
  count++;
  addGrain();
}
console.log(`A: Units of sand = ${count - 1}`); // 828

for (let r = 0; r < 10; r++) {
  console.log(
    matrix[r][494],
    matrix[r][495],
    matrix[r][496],
    matrix[r][497],
    matrix[r][498],
    matrix[r][499],
    matrix[r][500],
    matrix[r][501],
    matrix[r][502],
    matrix[r][503]
  );
}
