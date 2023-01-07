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
  // console.log("botSpec", botSpec)
  // console.log("minerals", minerals)
  // console.log("bots", bots)
  botSpec.forEach((mineralReqd, mineralId) => {
    // console.log("----")
    // console.log("mineralId", mineralId)
    // console.log("mineralReqd", mineralReqd)
    // console.log("mineral we have", minerals[mineralId])
    // console.log("mineral we need to collect", mineralReqd - minerals[mineralId])
    // console.log("number of bots we have", bots[mineralId])
    if (bots[mineralId] > 0) result = Math.max(result, Math.ceil((mineralReqd - minerals[mineralId]) / bots[mineralId]))
  })
  return result
}

function haveReqdBots(botSpec, bots) {
  for (let mineralId = 0; mineralId < 3; mineralId++) {
    const mineralReqd = botSpec[mineralId]
    // console.log("mineralReqd", mineralReqd)
    // console.log("mineralId", mineralId)
    // console.log("bots of that type owned", bots[mineralId])
    // console.log("mineralReqd > 0", mineralReqd > 0)
    // console.log("Number of bots = 0", bots[mineralId] === 0)
    // console.log("Both true", mineralReqd > 0 && bots[mineralId] === 0)
    if (mineralReqd > 0 && bots[mineralId] === 0) return false
  }
  return true
}

function dfs(blueprint, maxSpend, minutes, cache, minerals, bots) {
  // If no minutes left return current number of geodes
  if (minutes === 0) return minerals[3]

  // calculate a key from the current state
  const key = [minutes, ...minerals, ...bots].join("-")
  // compare the key with the cache (cache is a Map)
  // if a matching key is found simply return the value attaching to that key
  // which will be the number of geodes ultimately returned from dfs for the
  // state represented by the key
  if (cache.has(key)) return cache.get(key)

  // Calculate minimum geodes that could be built in time left with current resources.
  let maxGeodes = minerals[3] + (bots[3] * minutes)

  // Loop through each bot requirement in the blueprint
  // At the start of the loop,
  //    if you have enough bots to produce maxSpend amount for that bot's mineral
  //    then you don't need to build any more of that bot. Continue to next.
  for (let botId = 0; botId < 4; botId++) {
    if (botId !== 3 && bots[botId] >= maxSpend[botId]) continue
    const botSpec = blueprint[botId]

    // Check whether you have all bots required to meet the current botSpec
    // if not, there's no point considering later bot ids.
    if (!haveReqdBots(botSpec, bots)) break

    // Calculate how many minutes before you have enough resources to
    // build the bot which is the focus of this loop iteration (botId)
    // To do that, you need to know:
    // - how much of each mineral you need
    // - how many bots you have producing that mineral
    // - how much of that mineral you already have
    const wait = calculateWait(botSpec, minerals, bots)

    // Jump forward in time
    const minutesLeft = minutes - wait - 1
    // If minutesLeft is 0 (or less) then you don't have enough time
    // to make the bot which is the focus of this loop iteration (botId).
    // Continue to the next bot.
    if (minutesLeft <= 0) continue

    // It must now be the case that there is sufficient time to build this bot.
    // So, let's clone the bots array to work with in a minute.
    const bots_ = [...bots]
    // and create a new temporary minerals_ array augmented with the minerals
    // collected during the wait time
    const minerals_ = minerals.map((amount, mineralId) => amount + bots[mineralId] * (wait + 1))
    // Now deduct the minerals spent in building the current bot
    botSpec.forEach((mineralReqd, mineralId) => minerals_[mineralId] -= mineralReqd)
    // and increase the current bot type by 1
    bots_[botId]++

    // For each of our resource minerals (ore, clay & obsidian), if there is no
    // way that the amount you have on hand can be spent in the time remaining
    // it makes sense to throw away the excess. This leads to more states matching
    // the cache, so fewer recursions.
    for (let i = 0; i < 3; i++) {
      minerals_[i] = Math.min(minerals_[i], maxSpend[i] * minutesLeft)
    }

    // Adjust our maxGeodes calculation
    maxGeodes = Math.max(maxGeodes, dfs(blueprint, maxSpend, minutesLeft, cache, minerals_, bots_))
  }

  cache.set(key, maxGeodes)
  return maxGeodes
}

let total = 0

lines.forEach((line, index) => {
  const blueprint = []
  line.split(": ")[1].split(". ").forEach((profile, index) => {
    const parts = profile.trim().split(" ")
    blueprint.push([
      parseInt(parts[4]),
      index === 2 ? parseInt(parts[7]) : 0,
      index === 3 ? parseInt(parts[7]) : 0,
    ])
  })
  console.log(blueprint)
  // console.log(maxSpend(blueprint))

  const geodes = dfs(blueprint, maxSpend(blueprint), 24, new Map(), [0,0,0,0], [1,0,0,0])
  // console.log(geodes)
  total += (index + 1) * geodes
  })

console.log("A: Combined quality level =", total) // 1092

// console.log(calculateWait([3,14,0], [3,0,3,3], [1,1,0,0])) // should return 14
// console.log(calculateWait([3,14,0], [3,0,3,3], [1,2,0,0])) // should return 7
// console.log(calculateWait([11,14,0], [3,0,3,3], [1,2,0,0])) // should return 8

// console.log(haveReqdBots([2,0,7], [23,29,0,0]))