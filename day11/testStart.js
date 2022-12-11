const monkeys = [
  {
    items: [79, 98],
    operation(item) {
      return item * 19;
    },
    target: function (item) {
      return item % 23 === 0 ? 2 : 3;
    },
  },
  {
    items: [54, 65, 75, 74],
    operation(item) {
      return item + 6;
    },
    target: function (item) {
      return item % 19 === 0 ? 2 : 0;
    },
  },
  {
    items: [79, 60, 97],
    operation(item) {
      return item * item;
    },
    target: function (item) {
      return item % 13 === 0 ? 1 : 3;
    },
  },
  {
    items: [74],
    operation(item) {
      return item + 3;
    },
    target: function (item) {
      return item % 17 === 0 ? 0 : 1;
    },
  },
];

module.exports = monkeys;
