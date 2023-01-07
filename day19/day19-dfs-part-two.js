const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), false);

function maxSpend(bp) {
  const result = [0,0,0]
  for (let i = 0; i < 3; i++) {
    result[i] = Math.max(bp[0][i], bp[1][i], bp[2][i], bp[3][i], result[i])
  }
  return result
}

function calculateWait(botSpec, minerals, bots) {
  let result = 0
  botSpec.forEach((mineralReqd, mineralId) => {
    if (bots[mineralId] > 0) result = Math.max(result, Math.ceil((mineralReqd - minerals[mineralId]) / bots[mineralId]))
  })
  return result
}

function haveReqdBots(botSpec, bots) {
  for (let mineralId = 0; mineralId < 3; mineralId++) {
    const mineralReqd = botSpec[mineralId]
    if (mineralReqd > 0 && bots[mineralId] === 0) return false
  }
  return true
}

let count = 0
function dfs(blueprint, maxSpend, minutes, cache, minerals, bots) {
  count++
  if (minutes === 0) return minerals[3]

  const key = [minutes, ...minerals, ...bots].join("-")
  if (cache.has(key)) return cache.get(key)

  let maxGeodes = minerals[3] + (bots[3] * minutes)

  for (let botId = 0; botId < 4; botId++) {
    if (botId !== 3 && bots[botId] >= maxSpend[botId]) continue
    const botSpec = blueprint[botId]

    if (!haveReqdBots(botSpec, bots)) break

    const wait = calculateWait(botSpec, minerals, bots)
    const minutesLeft = minutes - wait - 1
    if (minutesLeft <= 0) continue

    const bots_ = [...bots]
    const minerals_ = minerals.map((amount, mineralId) => amount + bots[mineralId] * (wait + 1))
    botSpec.forEach((mineralReqd, mineralId) => minerals_[mineralId] -= mineralReqd)
    bots_[botId]++

    for (let i = 0; i < 3; i++) {
      minerals_[i] = Math.min(minerals_[i], maxSpend[i] * minutesLeft)
    }

    maxGeodes = Math.max(maxGeodes, dfs(blueprint, maxSpend, minutesLeft, cache, minerals_, bots_))
  }

  cache.set(key, maxGeodes)
  return maxGeodes
}

let total = 1


for (let line = 0; line < 3; line++) {
  const blueprint = []
  lines[line].split(": ")[1].split(". ").forEach((profile, index) => {
    const parts = profile.trim().split(" ")
    blueprint.push([
      parseInt(parts[4]),
      index === 2 ? parseInt(parts[7]) : 0,
      index === 3 ? parseInt(parts[7]) : 0,
    ])
  })
  console.log(blueprint)
  
  const geodes = dfs(blueprint, maxSpend(blueprint), 32, new Map(), [0,0,0,0], [1,0,0,0])
  total *= geodes
}

console.log("B: Product of largest number of geodes from each blueprint:", total) // 3542
console.log(`To arrive at this solution the dfs function is run ${count} times`)
