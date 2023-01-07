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

class State {
  constructor(ore, clay, obsidian, geode, oreR, clayR, obsR, geodeR, minute) {
    this.ore = ore
    this.clay = clay
    this.obsidian = obsidian
    this.geode = geode
    this.oreR = oreR
    this.clayR = clayR
    this.obsR = obsR
    this.geodeR = geodeR
    this.builtOreR = false
    this.builtClayR = false
    this.builtObsR = false
    this.builtGeodeR = false
    this.builtNoR = false
    this.minute = minute
  }
}

function canAffordGeodeRobot(state, blueprint) {
  return state.ore >= blueprint[3][0] && state.obsidian >= blueprint[3][2]
}

function canAffordObsidianRobot(state, blueprint) {
  return state.ore >= blueprint[2][0] && state.clay >= blueprint[2][1]
}

function canAffordClayRobot(state, blueprint) {
  return state.ore >= blueprint[1][0]
}

function canAffordOreRobot(state, blueprint) {
  return state.ore >= blueprint[0][0]
}

function fetchMinerals(state) {
  const ore = state.ore + state.oreR
  const clay = state.clay + state.clayR
  const obsidian = state.obsidian + state.obsR
  const geode = state.geode + state.geodeR
  const oreR = state.oreR
  const clayR = state.clayR
  const obsR = state.obsR
  const geodeR = state.geodeR
  const minute = state.minute + 1
  return new State(ore, clay, obsidian, geode, oreR, clayR, obsR, geodeR, minute) 
}

function buildGeodeRobot(state, blueprint) {
  const newState = fetchMinerals(state)
  newState.geodeR++
  newState.ore -= blueprint[3][0]
  newState.obsidian -= blueprint[3][2]
  return newState
}

function buildObsidianRobot(state, blueprint) {
  const newState = fetchMinerals(state)
  newState.obsR++
  newState.ore -= blueprint[2][0]
  newState.clay -= blueprint[2][1]
  return newState
}

function buildClayRobot(state, blueprint) {
  const newState = fetchMinerals(state)
  newState.clayR++
  newState.ore -= blueprint[1][0]
  return newState
}

function buildOreRobot(state, blueprint) {
  const newState = fetchMinerals(state)
  newState.oreR++
  newState.ore -= blueprint[0][0]
  return newState
}

const init = new State(0,0,0,0,1,0,0,0,0)
const stack = [init]

const duration = 24
let maxGeode = 0

function solve(state, blueprint) {
  if (stack.length < 1) {
    return maxGeode
  }
  // console.log(stack.length)
  console.log(state.minute, maxGeode)
  const remaining = duration - state.minute
  // if this is minute 24: fetch minerals; update maxGeode, pop state off stack, run solve again
  if (state.minute >= duration) {
    const newState = fetchMinerals(state)
    if (newState.geode > maxGeode) maxGeode = newState.geode
    stack.pop()
    return solve(stack[stack.length - 1], blueprint)
  }

  if (
    state.builtGeodeR && 
    state.builtObsR &&
    state.builtClayR &&
    state.buildOreRobot &&
    state.builtNoR
  ) {
    stack.pop()
  }

  if (!state.builtGeodeR & (remaining) > maxGeode) {
    if (canAffordGeodeRobot(state, blueprint)) {
      stack.push(buildGeodeRobot(state, blueprint))
      state.builtGeodeR = true
      state.builtObsR = true
      state.builtClayR = true
      state.builtOreR = true
      state.builtNoR = true
      return solve(stack[stack.length - 1], blueprint)
    } else {
      state.builtGeodeR = true
    }
  }

  if (!state.builtObsR && (state.obsidian) < blueprint[3][2]) {
    if (canAffordObsidianRobot(state, blueprint)) {
      stack.push(buildObsidianRobot(state, blueprint))
      state.builtObsR = true
      state.builtClayR = true
      state.builtOreR = true
      state.builtNoR = true
      return solve(stack[stack.length - 1], blueprint)
    } else {
      state.builtObsR = true
    }
  }

  if (!state.builtClayR && (state.clay) < blueprint[2][1]) {
    if (canAffordClayRobot(state, blueprint)) {
      stack.push(buildClayRobot(state, blueprint))
      state.builtClayR = true
      state.builtOreR = true
      state.builtNoR = true
      return solve(stack[stack.length - 1], blueprint)
    } else {
      state.builtClayR = true
    }
  }

  if (!state.builtOreR && (state.ore) < Math.max(blueprint[0][0], blueprint[1][0], blueprint[2][0])) {
    if (canAffordOreRobot(state, blueprint)) {
      stack.push(buildOreRobot(state, blueprint))
      state.builtOreR = true
      state.builtNoR = true
      return solve(stack[stack.length - 1], blueprint)
    } else {
      state.builtOreR = true
    }
  }

  if (!state.builtNoR) {
    stack.push(fetchMinerals(state))
    state.builtNoR = true
    return solve(stack[stack.length - 1], blueprint)
  }
  
  stack.pop()
  return solve(stack[stack.length - 1], blueprint)
}

// console.log(canAffordGeodeRobot(init, blueprints[0]))
// console.log(canAffordObsidianRobot(init, blueprints[0]))
// console.log(canAffordClayRobot(init, blueprints[0]))
// console.log(canAffordOreRobot(init, blueprints[0]))

console.log("Geodes:", solve(init, blueprints[1]))