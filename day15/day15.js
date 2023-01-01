/**
 * THIS SOLUTION FAILS WITH FULL INPUT DATA
 * THE HEAP OVERFLOWS
 */

const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);

function negativeShift(sensors) {
  let negX = 0;
  let negY = 0;
  sensors.forEach((sensor) => {
    negX = sensor.x < negX ? sensor.x : negX;
    // negX = sensor.beaconX < negX ? sensor.beaconX : negX;
    negX =
      sensor.x - sensor.manhattan < negX ? sensor.x - sensor.manhattan : negX;
    negY = sensor.y < negY ? sensor.y : negY;
    // negY = sensor.beaconY < negY ? sensor.beaconY : negY;
    negY =
      sensor.y - sensor.manhattan < negY ? sensor.y - sensor.manhattan : negY;
  });
  return [negX, negY];
}

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
  const shiftArray = negativeShift(sensors);
  console.log("Shiftarray", shiftArray);
  sensors.forEach((sensor) => {
    sensor.x -= shiftArray[0];
    sensor.beaconX -= shiftArray[0];
    sensor.y -= shiftArray[1];
    sensor.beaconY -= shiftArray[1];
  });
  return sensors;
}

function buildStartArray(sensors) {
  let maxR = 0;
  let maxC = 0;
  sensors.forEach((sensor) => {
    maxR =
      sensor.y + sensor.manhattan > maxR ? sensor.y + sensor.manhattan : maxR;
    // maxR = sensor.beaconY > maxR ? sensor.beaconY : maxR;
    maxC =
      sensor.x + sensor.manhattan > maxC ? sensor.x + sensor.manhattan : maxC;
    // maxC = sensor.beaconX > maxC ? sensor.beaconX : maxC;
  });
  return helpers.create2DArrayOfZeros(maxR, maxC);
}

function logNoBeacon(sensors, system) {
  sensors.forEach((sensor) => {
    for (let r = sensor.y; r < sensor.y + sensor.manhattan; r++) {
      for (
        let c = sensor.x;
        c < sensor.x + (sensor.y + sensor.manhattan - r);
        c++
      ) {
        system[r][c] = 1;
      }
    }
    for (let r = sensor.y; r < sensor.y + sensor.manhattan; r++) {
      for (
        let c = sensor.x;
        c > sensor.x - (sensor.y + sensor.manhattan - r);
        c--
      ) {
        system[r][c] = 1;
      }
    }
    for (let r = sensor.y; r > sensor.y - sensor.manhattan; r--) {
      for (
        let c = sensor.x;
        c < sensor.x + (sensor.manhattan - (sensor.y - r));
        c++
      ) {
        system[r][c] = 1;
      }
    }
    for (let r = sensor.y; r > sensor.y - sensor.manhattan; r--) {
      for (
        let c = sensor.x;
        c > sensor.x - (sensor.manhattan - (sensor.y - r));
        c--
      ) {
        system[r][c] = 1;
      }
    }
  });
}

const sensors = findSensors();
// console.log(sensors);
const caveSystem = buildStartArray(sensors);
logNoBeacon(sensors, caveSystem);

// for (let i = 0; i < caveSystem.length; i++) {
//   console.log(`Row ${i}: ${caveSystem[i].filter((el) => el === 1).length}`);
// }

// console.log("9:", caveSystem[9].filter((el) => el === 1).length);
// console.log("14:", caveSystem[14].filter((el) => el === 1).length);
// console.log("24:", caveSystem[24].filter((el) => el === 1).length);
// console.log("27:", caveSystem[27].filter((el) => el === 1).length);
