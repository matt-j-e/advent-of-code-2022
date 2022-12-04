const helpers = require("../helpers/helperFunctions");

const calVals = helpers.loadData(__dirname.split("/").pop(), 0);

const totalCalsPerElf = [];
let count = 0;
calVals.forEach((calVal) => {
  if (calVal === "") {
    totalCalsPerElf.push(count);
    count = 0;
  } else {
    count += Number(calVal);
  }
});
const sortedTotalPerElf = totalCalsPerElf.sort((a, b) => a - b).reverse();
console.log("A: Largest calorie load =", sortedTotalPerElf[0]); // 68923
console.log(
  "B: Largest 3 calorie loads =",
  sortedTotalPerElf[0] + sortedTotalPerElf[1] + sortedTotalPerElf[2]
); // 200044
