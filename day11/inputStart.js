const monkeys = [
  {
    // MONKEY 0
    items: [52, 78, 79, 63, 51, 94],
    operation(item) {
      return item * 13;
    },
    target: function (item) {
      return item % 5 === 0 ? 1 : 6;
    },
  },
  {
    // MONKEY 1
    items: [77, 94, 70, 83, 53],
    operation(item) {
      return item + 3;
    },
    target: function (item) {
      return item % 7 === 0 ? 5 : 3;
    },
  },
  {
    // MONKEY 2
    items: [98, 50, 76],
    operation(item) {
      return item * item;
    },
    target: function (item) {
      return item % 13 === 0 ? 0 : 6;
    },
  },
  {
    // MONKEY 3
    items: [92, 91, 61, 75, 99, 63, 84, 69],
    operation(item) {
      return item + 5;
    },
    target: function (item) {
      return item % 11 === 0 ? 5 : 7;
    },
  },
  {
    // MONKEY 4
    items: [51, 53, 83, 52],
    operation(item) {
      return item + 7;
    },
    target: function (item) {
      return item % 3 === 0 ? 2 : 0;
    },
  },
  {
    // MONKEY 5
    items: [76, 76],
    operation(item) {
      return item + 4;
    },
    target: function (item) {
      return item % 2 === 0 ? 4 : 7;
    },
  },
  {
    // MONKEY 6
    items: [75, 59, 93, 69, 76, 96, 65],
    operation(item) {
      return item * 19;
    },
    target: function (item) {
      return item % 17 === 0 ? 1 : 3;
    },
  },
  {
    // MONKEY 7
    items: [89],
    operation(item) {
      return item + 2;
    },
    target: function (item) {
      return item % 19 === 0 ? 2 : 4;
    },
  },
];

module.exports = monkeys;
