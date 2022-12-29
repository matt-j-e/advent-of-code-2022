const helpers = require("../helpers/helperFunctions")
const lines = helpers.loadData(__dirname.split("/").pop(), false)
  .filter(el => el !== "")

const packets = []
for (let i = 0; i < lines.length; i += 2) {
  packets.push({
    l: JSON.parse(lines[i]),
    r: JSON.parse(lines[i+1])
  })
}

const correctIndices = []
let count = 1
while (packets.length > 0) {
  const packet = packets.shift()
  const shortest = Math.min(packet.l.length, packet.r.length)
  console.log(packet.l, packet.r)
  if (packet.r > packet.l) {
    // console.log(">>>>>>>>>", count)
    correctIndices.push(count)
  }
  count++
}

console.log("A: Sum of indices of packets in right order:", correctIndices.reduce((tot, i) => tot + i, 0)) // 5652 wrong

