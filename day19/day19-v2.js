const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), true);

const blueprints = []
lines.forEach(line => {
  const blueprint = []
  const details = line.split(": ")[1]
  const costProfiles = details.split(". ")
  costProfiles.forEach((profile, index) => {
    const parts = profile.trim().split(" ")
    blueprint.push([
      parseInt(parts[4]),
      index === 2 ? parseInt(parts[7]) : 0,
      index === 3 ? parseInt(parts[7]) : 0,
    ])
  })
  blueprints.push(blueprint)
})

function canAfford(type, state, blueprint) {
  return (
    state[0] >= blueprint[type][0] &&
    state[1] >= blueprint[type][1] &&
    state[2] >= blueprint[type][2] 
  )
}

function resolveBlueprint(b) {
  const state = [0,0,0,0,1,0,0,0]
  for (let m = 1; m < 25; m++) {
    const robotsBuilding = [0,0,0,0]
    if (canAfford(3, state, b)) {
      state[0] -= b[3][0]
      state[1] -= b[3][1]
      state[2] -= b[3][2]
      robotsBuilding[3]++
    } else if (canAfford(2, state, b)) {
      state[0] -= b[2][0]
      state[1] -= b[2][1]
      state[2] -= b[2][2]
      robotsBuilding[2]++
    } else if (canAfford(1, state, b)) {
      state[0] -= b[1][0]
      state[1] -= b[1][1]
      state[2] -= b[1][2]
      robotsBuilding[1]++
    } else if (canAfford(0, state, b)) {
      state[0] -= b[0][0]
      state[1] -= b[0][1]
      state[2] -= b[0][2]
      robotsBuilding[0]++
    }

    // add elements
    for (let e = 0; e < 4; e++) {
      state[e] += state[e + 4]
    }

    // add built robots
    for (let r = 4; r < 8; r++) {
      state[r] += robotsBuilding[r - 4]
    }
    console.log(m, state)
  }
  console.log("Final state:", state)
}

// blueprints.forEach(b => resolveBlueprint(b))
resolveBlueprint(blueprints[0])