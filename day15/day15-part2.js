const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), true);

function findSensors() {
  const sensors = [];
  lines.forEach((line) => {
    const elements = line.split(" ");
    const sensor = {};
    sensor.x = parseInt(elements[2].split("=")[1].replace(",", ""));
    sensor.y = parseInt(elements[3].split("=")[1].replace(",", ""));
    sensor.beaconX = parseInt(elements[8].split("=")[1].replace(",", ""));
    sensor.beaconY = parseInt(elements[9].split("=")[1].replace(",", ""));
    sensor.manhattan =
      Math.abs(sensor.x - sensor.beaconX) + Math.abs(sensor.y - sensor.beaconY);
    sensors.push(sensor);
  });
  return sensors;
}

// console.log(findSensors())

const boundary = 20
// const boundary = 4000000

/**
 * This works for the test data set.
 * Not sure though if I'm going to be able to use this rowGenerator
 * function in Part 2. It will be necessary to trim the rows
 * to exclude <0 & >boundary values. That trimming breaks the splice
 * functionality.
 */
function rowGenerator(x, y, m, i) {
  let row = []
  if (y + m - i < 0 || y + m - i > boundary) return row
  for (let x_ = x - m; x_ < x + m + 1; x_++) {
    // if (x_ < 0 || x_ > boundary) continue
    row.push(`${x_}:${y + m - i}`)
  }
  row = row.splice(Math.abs(m - i), row.length - Math.abs(m - i))
  row = row.splice(0, row.length - Math.abs(m - i))
  return row.filter(node => node.split(":")[0] >= 0 && node.split(":")[0] <= boundary)
  // return row
}

function emptyPositions(x, y, m, bx, by) {
  const result = []
  for (let i = 0; i < m * 2 + 1; i++) {
    result.push(rowGenerator(x, y, m, i))
  }
  return result.flat()
}

// console.log(rowGenerator(20, 1, 7, 5))
const allEmptyPositions = []
findSensors().forEach((s, i) => {
  console.log(`Processing sensor ${i + 1}....`)
  emptyPositions(s.x, s.y, s.manhattan).forEach(pos => allEmptyPositions.push(pos))
})

const positions = new Set()
allEmptyPositions.map(pos => positions.add(pos))

console.log(positions.size)

for (let y = 0; y < boundary; y++) {
  const row = Array.from(positions).filter(pos => pos.split(":")[1] === String(y))
  // console.log(`y = ${y}. Length = ${row.length}`)
  if (row.length < boundary + 1) {
    for (let x = 0; x < boundary + 1; x++) {
      if (!row.includes(`${x}:${y}`)) {
        console.log("B:", x * 4000000 + y)
        break
      }
    }
  }
}