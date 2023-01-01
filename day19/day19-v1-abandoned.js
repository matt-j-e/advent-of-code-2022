/**
 * THIS WORKS, IN THAT IT PROVIDES A SOLUTION, BUT ONLY PROVIDES A SINGLE
 * SOLUTION. THE PUZZLE IS ACTUALLY ASKING YOU TO LOOK AT ALL POSSIBLE SOLUTIONS
 * AND PICK THE ONE THAT GIVES THE LARGEST NUMBER OF GEODES
 */
const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), 1);

const blueprints = []
lines.forEach(line => {
  const blueprint = []
  const details = line.split(":")[1]
  const robots = details.split(". ")
  robots.forEach((r, index) => {
    const robot = {}
    const parts = r.trim().split(" ")
    const type = parts[1]
    const cost = {
      ore: parseInt(parts[4]),
      clay: type === "obsidian" ? parseInt(parts[7]) : 0,
      obsidian: type === "geode" ? parseInt(parts[7]) : 0
    }
    robot.type = type
    robot.cost = cost
    blueprint.push(robot)
  })
  blueprints.push(blueprint)
})

console.log(blueprints[0])
console.log(blueprints[1].find(obj => obj.type === 'geode').cost.obsidian)

function canAffordMachine(comodities, blueprint, type) {
  // console.log("To build:", type)
  // console.log("We need:", blueprint.find(obj => obj.type === type).cost.ore, "ore. We have", comodities.get('ore'), "ore")
  // console.log("We need:", blueprint.find(obj => obj.type === type).cost.clay, "clay. We have", comodities.get('clay'), "clay")
  // console.log("We need:", blueprint.find(obj => obj.type === type).cost.obsidian, "obsidian. We have", comodities.get('obsidian'), "obsidian")
  // console.log("Enough ore:", comodities.get('ore') >= blueprint.find(obj => obj.type === type).cost.ore)
  // console.log("Enough clay:", comodities.get('clay') >= blueprint.find(obj => obj.type === type).cost.clay)
  // console.log("Enough obsidian", comodities.get('obsidian') >= blueprint.find(obj => obj.type === type).cost.obsidian)
  return (
    comodities.get('ore') >= blueprint.find(obj => obj.type === type).cost.ore &&
    comodities.get('clay') >= blueprint.find(obj => obj.type === type).cost.clay &&
    comodities.get('obsidian') >= blueprint.find(obj => obj.type === type).cost.obsidian
  )
}

function testBlueprint(blueprint) {
  const comodities = new Map()
  comodities.set('ore', 0)
  comodities.set('clay', 0)
  comodities.set('obsidian', 0)
  comodities.set('geode', 0)

  const machines = new Map()
  machines.set('ore', 1)
  machines.set('clay', 0)
  machines.set('obsidian', 0)
  machines.set('geode', 0)

  for (let i = 1; i < 25; i++) {
    console.log("=========\nMinute", i)

    const building = [0, 0, 0, 0]

    // check if we can build any machines
    // if so, deduct materials & add machine to building array
    while (canAffordMachine(comodities, blueprint, 'geode')) {
      building[3]++
      comodities.set('ore', comodities.get('ore') - blueprint.find(obj => obj.type === 'geode').cost.ore)
      comodities.set('clay', comodities.get('clay') - blueprint.find(obj => obj.type === 'geode').cost.clay)
      comodities.set('obsidian', comodities.get('obsidian') - blueprint.find(obj => obj.type === 'geode').cost.obsidian)
    }
    while (canAffordMachine(comodities, blueprint, 'obsidian')) {
      building[2]++
      comodities.set('ore', comodities.get('ore') - blueprint.find(obj => obj.type === 'obsidian').cost.ore)
      comodities.set('clay', comodities.get('clay') - blueprint.find(obj => obj.type === 'obsidian').cost.clay)
    }
    while (canAffordMachine(comodities, blueprint, 'clay')) {
      building[1]++
      comodities.set('ore', comodities.get('ore') - blueprint.find(obj => obj.type === 'clay').cost.ore)
    }
    while (canAffordMachine(comodities, blueprint, 'ore')) {
      building[0]++
      comodities.set('ore', comodities.get('ore') - blueprint.find(obj => obj.type === 'ore').cost.ore)
    }

    console.log("Building array:", building)

    // add comodities
    machines.forEach((v, k) => {
      numAdded = machines.get(k)
      currNum = comodities.get(k)
      comodities.set(k, currNum + numAdded)
    })

    // add built machines
    machines.set('ore', machines.get('ore') + building[0])
    machines.set('clay', machines.get('clay') + building[1])
    machines.set('obsidian', machines.get('obsidian') + building[2])
    machines.set('geode', machines.get('geode') + building[3])
    
    console.log("Comodities:", comodities)
    console.log("Machines:", machines)
    console.log("=========\n")
  }
}

blueprints.forEach(blueprint => testBlueprint(blueprint))