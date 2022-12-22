const helpers = require("../helpers/helperFunctions");
const origin = helpers.loadData(__dirname.split("/").pop(), 0);
const working = [...origin];

// console.log(working);

for (let i = 0; i < origin.length; i++) {
  const currentIndex = working.findIndex((el) => el === origin[i]);
  let newIndex = (currentIndex + parseInt(origin[i])) % (origin.length - 1);
  // if (newIndex === 0) newIndex = origin.length - 1;
  // const removedEl = working.splice(currentIndex, 1);
  working.splice(newIndex, 0, working.splice(currentIndex, 1)[0]);
  // console.log(origin[i]);
  // console.table(working);
}

// console.log(working);
const indexOfZero = working.findIndex((el) => el === "0");
const positions = [1000, 2000, 3000];
let sumOfPositionedElements = 0;
positions.forEach((pos) => {
  // const index = ((pos % working.length) + indexOfZero) % working.length;
  const index = (pos + indexOfZero) % (working.length - 1);
  const thisEl = parseInt(working[index]);
  console.log(thisEl);
  sumOfPositionedElements += thisEl;
});
console.log("Index of zero =", indexOfZero);
console.log("Length =", working.length);
console.log(sumOfPositionedElements); // -9344, -9641, -5759 are wrong

console.log(working[1197]);
