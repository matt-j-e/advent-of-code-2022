const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 0);

const monkeys = {};

function monkeyFunction(str) {
  const monkey1 = str.substring(0, 4);
  const monkey2 = str.substring(7);
  const sym = str.substring(5, 6);
  if (sym === "+") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() + monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() + monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] + monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] + monkeys[monkey2];
    };
  }
  if (sym === "-") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() - monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() - monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] - monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] - monkeys[monkey2];
    };
  }
  if (sym === "*") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() * monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() * monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] * monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] * monkeys[monkey2];
    };
  }
  if (sym === "/") {
    return function monkeyBusiness() {
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1]() / monkeys[monkey2]();
      if (typeof monkeys[monkey1] === "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1]() / monkeys[monkey2];
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] === "function") return monkeys[monkey1] / monkeys[monkey2]();
      if (typeof monkeys[monkey1] !== "function" && typeof monkeys[monkey2] !== "function") return monkeys[monkey1] / monkeys[monkey2];
    };
  }
}


lines.forEach((line) => {
  const parts = line.split(": ");
  if (!isNaN(Number(parts[1]))) {
    monkeys[parts[0]] = Number(parts[1]);
  } else {
    monkeys[parts[0]] = monkeyFunction(parts[1]);
  }
});

console.log("A: The monkey named Root will yell:", monkeys.root()); // 145167969204648

let h = 3_330_805_295_500;
while (true) {
  lines.forEach(line => {
    const parts = line.split(": ");
    // if (parts[0] === 'root') parts[1] = 'pppw - sjmn'; // test
    if (parts[0] === 'root') parts[1] = 'bjgs - tjtt'; // actual input
    if (parts[0] === 'humn') parts[1] = h;
    if (!isNaN(Number(parts[1]))) {
      monkeys[parts[0]] = Number(parts[1]);
    } else {
      monkeys[parts[0]] = monkeyFunction(parts[1]);
    }
  });
  // console.log(h, monkeys.pppw(), monkeys.sjmn()); // test
  // console.log(h, monkeys.bjgs(), monkeys.tjtt()); // actual input
  if (monkeys.root() === 0) {
    console.log('B: You yell:', h); // 3330805295850
    // console.log(monkeys.pppw(), monkeys.sjmn()); // test
    // console.log(monkeys.bjgs(), monkeys.tjtt()); // actual input
    break;
  }
  h += 1;
}

/*
I THOUGHT IT WOULD BE QUICKER TO DO A MANUAL BINARY SEARCH THAN CODE ONE LOLOLOL. 
IT ACTUALLY TOOK ABOUT 30 MINS TO NARROW IT DOWN TO THE POINT THAT I COULD JUST RUN MY
INCREMENT BY 1 LOOP. SEE BELOW FOR MY TRIAL & ERROR VALUES...

104359651443492 
40608253763172

14,300,000,000
104285155443492
40608253763172

110,470,000,000 
102438691443492 
40608253763172

5,201,310,000,000 
4694563443492.004 
40608253763172

5,000,850,000,000 
8543395443491.996 
40608253763172

1,000,000,000,000 
85359715443492 
40608253763172

2,000,000,000,000 
66159715443492 
40608253763172

3,000,000,000,000 
46959715443492 
40608253763172

3,200,000,000,000
43119715443492.01 
40608253763172

3,300,000,000,000
41199715443492 
40608253763172

3,330,000,000,000
40623715443492.01 
40608253763172

3,330,500,000,000
40614115443491.99 
40608253763172

3,330,600,000,000
40612195443492 
40608253763172

3,330,750,000,000
40609315443491.99 
40608253763172

3,330,760,000,000
40609123443492 
40608253763172

3,330,800,000,000
40608355443492 
40608253763172

3,330,805,000,000
40608259443492 
40608253763172

3,330,805,200,000
40608255603492 
40608253763172

3,330,805,250,000
40608254643492 
40608253763172

3,330,805,270,000
40608254259492 
40608253763172

3,330,805,290,000
40608253875492 
40608253763172

3,330,805,295,000
40608253779492 
40608253763172

3,330,805,295,500
40608253769892.01 
40608253763172

3,330,805,295,500  THIS WAS MY CHOSEN START POINT TI INCREMENT BY 1 FROM. IT TOOK ABOUT 5 SECONDS FROM THIS VALUE

3,330,805,296,000
40608253760291.99 
40608253763172

3,330,805,297,000
40608253741092 
40608253763172

3,330,805,300,000
40608253683492.01 
40608253763172

3,330,805,500,000
40608249843492.01 
40608253763172

3,330,806,000,000
40608240243491.99 
40608253763172

3,330,810,000,000
40608163443492.01 
40608253763172

3,330,815,000,000
40608067443491.99 
40608253763172

3,330,830,000,000
40607779443492 
40608253763172

3,330,850,000,000
40607395443492 
40608253763172

3,331,000,000,000
40604515443492 
40608253763172

3,332,000,000,000
40585315443492 
40608253763172

3,334,000,000,000
40546915443492 
40608253763172

3,335,000,000,000
40527715443491.99 
40608253763172

3,350,000,000,000
40239715443492 
40608253763172

3,400,000,000,000
39279715443492.01 
40608253763172

3,500,000,000,000
37359715443492 
40608253763172

4,000,000,000,000 
27759715443492 
40608253763172
*/
