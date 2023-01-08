const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), false);

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

// const target = 10
const target = 2000000

function rowGenerator(x, y, m, i, bx, by) {
  let row = []
  if (y + m - i !== target) return row
  for (let x_ = x - m; x_ < x + m + 1; x_++) {
    if (x_ === bx && y + m - i === by) continue
    row.push(`${x_}:${y + m - i}`)
  }
  row = row.splice(Math.abs(m - i), row.length - Math.abs(m - i))
  row = row.splice(0, row.length - Math.abs(m - i))
  return row
}

function emptyPositions(x, y, m, bx, by) {
  const result = []
  for (let i = 0; i < m * 2 + 1; i++) {
    result.push(rowGenerator(x, y, m, i, bx, by))
  }
  return result.flat()
}

const allEmptyPositions = []
findSensors().forEach((s, i) => {
  console.log(`Processing sensor ${i + 1}....`)
  emptyPositions(s.x, s.y, s.manhattan, s.beaconX, s.beaconY).forEach(pos => allEmptyPositions.push(pos))
})

const positions = new Set()
allEmptyPositions.map(pos => positions.add(pos))
console.log("A: Number of positions that cannot contain a beacon =", positions.size) // 4886370