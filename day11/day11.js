const monkeys = require("./testStart");

console.log(monkeys);

monkeys.forEach((monkey, index) => {
  console.log(index);
  while (monkey.items.length > 0) {
    monkey.items[0] = monkey.operation(monkey.items[0]);
    monkey.items[0] = Math.floor(monkey.items[0] / 3);
    console.log(
      `Item with worry level ${
        monkey.items[0]
      } is thrown to monkey ${monkey.target(monkey.items[0])}`
    );
    const target = monkey.target(monkey.items[0]);
    monkeys[target].items.push(monkey.items.shift());
  }
});

console.log(monkeys);
