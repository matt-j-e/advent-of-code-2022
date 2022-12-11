const monkeys = require("./testStart");

console.log(monkeys);

monkeys.forEach((monkey) => {
  for (let i = 0; i < monkey.items.length; i++) {
    monkey.items[i] = monkey.operation(monkey.items[i]);
    monkey.items[i] = Math.floor(monkey.items[i] / 3);
    console.log(
      `Monkey ${monkey.target(
        monkey.items[i]
      )} receives item with worry level of ${monkey.items[i]}`
    );
  }
});
