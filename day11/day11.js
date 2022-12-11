// const monkeys = require("./testStart");
const monkeys = require("./inputStart");

// console.log(monkeys);
const inspected = [];
monkeys.forEach((m) => inspected.push(0));

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey, index) => {
    inspected[index] += monkey.items.length;
    // console.log(index);
    while (monkey.items.length > 0) {
      monkey.items[0] = monkey.operation(monkey.items[0]);
      monkey.items[0] = Math.floor(monkey.items[0] / 3); // COMMENT OUT FOR PART TWO
      // console.log(
      //   `Item with worry level ${
      //     monkey.items[0]
      //   } is thrown to monkey ${monkey.target(monkey.items[0])}`
      // );
      const target = monkey.target(monkey.items[0]);
      monkeys[target].items.push(monkey.items.shift());
    }
  });
  // console.log(`>>>>>> ROUND ${i}`);
  // console.log(monkeys);
}

// console.log(monkeys);
// console.log(inspected);
console.log(
  `Level of monkey business = ${
    inspected.sort((a, b) => a - b).reverse()[0] *
    inspected.sort((a, b) => a - b).reverse()[1]
  }`
); // A: 58786 , B: 14403120153 is too low
