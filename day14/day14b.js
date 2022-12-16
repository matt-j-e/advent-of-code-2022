const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
let maxC = 0;
let maxR = 0;
console.log(lines);

function createEmptyMatrix() {
  let floorR = 0;
  lines.forEach((line) => {
    const nodes = line.split(" -> ");
    nodes.forEach((node) => {
      coords = node.split(",");
      maxC = parseInt(coords[0]) > maxC ? parseInt(coords[0]) : maxC;
      maxR = parseInt(coords[1]) > maxR ? parseInt(coords[1]) : maxR;
    });
    floorR = maxR + 2;
  });
  console.log("maxR", maxR, "maxC", maxC);
  const matrix = helpers.create2DArrayOfDots(maxR + 3, maxC + 10000);
  for (let i = 0; i < matrix[0].length; i++) {
    matrix[floorR][i] = "#";
  }
  return matrix;
}

function addCaveStructure(matrix) {
  while (lines.length > 0) {
    const line = lines.shift();
    // console.log(line);
    const nodes = line.split(" -> ");
    // console.log("Nodes", nodes);
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
    if (matrix[0][500] === "o") FLOWING = false;
  }
}

function canMoveDown(coords) {
  return matrix[coords.r + 1][coords.c] === ".";
}

function canMoveDownLeft(coords) {
  return matrix[coords.r + 1][coords.c - 1] === ".";
}

function canMoveDownRight(coords) {
  return matrix[coords.r + 1][coords.c + 1] === ".";
}

const matrix = createEmptyMatrix();
addCaveStructure(matrix);
let count = 0;
while (FLOWING) {
  count++;
  addGrain();
}
console.log(`B: Units of sand = ${count}`); // 25500

// for (let r = 0; r < 12; r++) {
//   console.log(
//     matrix[r][490],
//     matrix[r][491],
//     matrix[r][492],
//     matrix[r][493],
//     matrix[r][494],
//     matrix[r][495],
//     matrix[r][496],
//     matrix[r][497],
//     matrix[r][498],
//     matrix[r][499],
//     matrix[r][500],
//     matrix[r][501],
//     matrix[r][502],
//     matrix[r][503],
//     matrix[r][504],
//     matrix[r][505],
//     matrix[r][506],
//     matrix[r][507],
//     matrix[r][508],
//     matrix[r][509],
//     matrix[r][510],
//     matrix[r][511],
//     matrix[r][512],
//     matrix[r][513]
//   );
// }
