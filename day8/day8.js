const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);
const trees = lines.map((line) => line.split(""));

function isTallestLookingLeft(row, col, arr) {
  const currentHeight = arr[row][col];
  const tallestToLeft = arr[row].slice(0, col).sort().reverse()[0];
  return currentHeight > tallestToLeft;
}

function isTallestLookingRight(row, col, arr) {
  const currentHeight = arr[row][col];
  const tallestToRight = arr[row]
    .slice(col + 1)
    .sort()
    .reverse()[0];
  return currentHeight > tallestToRight;
}

function isTallestLookingUp(row, col, arr) {
  const currentHeight = arr[row][col];
  const currentCol = arr.map((r) => r[col]);
  const tallestLookingUp = currentCol.slice(0, row).sort().reverse()[0];
  return currentHeight > tallestLookingUp;
}

function isTallestLookingDown(row, col, arr) {
  const currentHeight = arr[row][col];
  const currentCol = arr.map((r) => r[col]);
  const tallestLookingDown = currentCol
    .slice(row + 1)
    .sort()
    .reverse()[0];
  return currentHeight > tallestLookingDown;
}

let visibleTrees = (trees.length + trees[0].length) * 2 - 4; // initialising to outer line of trees

for (let r = 1; r < trees.length - 1; r++) {
  for (let c = 1; c < trees[r].length - 1; c++) {
    if (
      isTallestLookingUp(r, c, trees) ||
      isTallestLookingRight(r, c, trees) ||
      isTallestLookingDown(r, c, trees) ||
      isTallestLookingLeft(r, c, trees)
    )
      visibleTrees++;
  }
}

console.log("A: Visible trees =", visibleTrees); // 1779

function viewingDistanceUp(row, col, arr) {
  if (
    row === 0 ||
    row === arr[row].length - 1 ||
    col === 0 ||
    col === arr.length - 1
  )
    return 0;
  const currentHeight = arr[row][col];
  const currentCol = arr.map((r) => r[col]);
  const currentColLookingUp = currentCol.slice(0, row).reverse();
  let count = 0;
  for (let i = 0; i < currentColLookingUp.length; i++) {
    if (currentColLookingUp[i] < currentHeight) {
      count++;
    } else {
      count++;
      break;
    }
  }
  return count;
}

function viewingDistanceRight(row, col, arr) {
  if (
    row === 0 ||
    row === arr[row].length - 1 ||
    col === 0 ||
    col === arr.length - 1
  )
    return 0;
  const currentHeight = arr[row][col];
  const currentRowLookingRight = arr[row].slice(col + 1);
  let count = 0;
  for (let i = 0; i < currentRowLookingRight.length; i++) {
    if (currentRowLookingRight[i] < currentHeight) {
      count++;
    } else {
      count++;
      break;
    }
  }
  return count;
}

function viewingDistanceDown(row, col, arr) {
  if (
    row === 0 ||
    row === arr[row].length - 1 ||
    col === 0 ||
    col === arr.length - 1
  )
    return 0;
  const currentHeight = arr[row][col];
  const currentCol = arr.map((r) => r[col]);
  const currentColLookingDown = currentCol.slice(row + 1);
  let count = 0;
  for (let i = 0; i < currentColLookingDown.length; i++) {
    if (currentColLookingDown[i] < currentHeight) {
      count++;
    } else {
      count++;
      break;
    }
  }
  return count;
}

function viewingDistanceLeft(row, col, arr) {
  if (
    row === 0 ||
    row === arr[row].length - 1 ||
    col === 0 ||
    col === arr.length - 1
  )
    return 0;
  const currentHeight = arr[row][col];
  const currentRowLookingLeft = arr[row].slice(0, col).reverse();
  let count = 0;
  for (let i = 0; i < currentRowLookingLeft.length; i++) {
    if (currentRowLookingLeft[i] < currentHeight) {
      count++;
    } else {
      count++;
      break;
    }
  }
  return count;
}

let highestScenicScore = 0;

for (let r = 0; r < trees.length; r++) {
  for (let c = 0; c < trees[r].length; c++) {
    trees[r][c] = parseInt(trees[r][c]);
    const scenicScore =
      viewingDistanceUp(r, c, trees) *
      viewingDistanceRight(r, c, trees) *
      viewingDistanceDown(r, c, trees) *
      viewingDistanceLeft(r, c, trees);
    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
  }
}

console.log("B: Highest scenic score =", highestScenicScore); // 172224
