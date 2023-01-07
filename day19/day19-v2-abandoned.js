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

function deepCopy(arr) {
  let copy = []
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
  })
  return copy
}

function resolveBlueprint(blueprint, minutes=24) {
  const initialState = [0,0,0,0,1,0,0,0]
  let currGen = [initialState]
  let nextGen
  for (let m = 1; m < minutes+1; m++) {
    // console.log("Start of minute", m, "Current Gen", currGen)
    nextGen = []
    for (let i = 0; i < currGen.length; i++) {
      let state = [...currGen[i]]
      // console.log("State:", state)
      for (let type = 3; type > -1; type--) {
        const robotsBuilding = [0,0,0,0]
        const newState = [0,0,0,0,0,0,0,0]
        if (canAfford(type, state, blueprint)) {
          newState[0] = state[0] - blueprint[type][0]
          newState[1] = state[1] - blueprint[type][1]
          newState[2] = state[2] - blueprint[type][2]
          robotsBuilding[type]++
        }
        
        // add elements
        for (let e = 0; e < 4; e++) {
          newState[e] = state[e] + state[e + 4]
        }
        
        // add built robots
        for (let r = 4; r < 8; r++) {
          newState[r] = state[r] + robotsBuilding[r - 4]
        }
        
        // console.log("M:", m, "Type:", type, newState)
        nextGen.push(newState)
        // console.log(`NextGen after pushing state after M${m} Type ${type}: ${nextGen}`)
      }
      // buy none state
      const newState = state.map(el => el)
      // add elements
      for (let e = 0; e < 4; e++) {
        newState[e] += newState[e + 4]
      }
      nextGen.push(newState)
      // nextGen = nextGen
      //   .sort((a, b) => b[8] - a[8])
      //   .slice(0, 2000)
      // nextGen.map(s => s.pop())
    }
    console.log(nextGen)
    currGen = [...nextGen]
  }
  return nextGen

}

// blueprints.forEach(b => resolveBlueprint(b))
const bp1Geodes = resolveBlueprint(blueprints[0],10).sort((a, b) => b[1] - a[1])[0]
console.log(bp1Geodes)
