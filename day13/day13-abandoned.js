const helpers = require("../helpers/helperFunctions");
const lines = helpers.loadData(__dirname.split("/").pop(), false)
  .filter(el => el !== "");

const packets = [];
for (let i = 0; i < lines.length; i += 2) {
  packets.push({
    l: JSON.parse(lines[i]),
    r: JSON.parse(lines[i+1])
  })
}

function packetType(p) {
  return Array.isArray(p) ? "arr" : "num";
}

function compareArrays(l, r) {
  while(l.length > 0 && r.length > 0) {
    const left = l.shift()
    const right = r.shift()
    if (packetType(left) === "arr" && packetType(right) === "arr") {
      // if (compareArrays(left, right) === 'correct') return 'correct'
      return compareArrays(left, right) === 'correct' ? 'correct' : 'wrong'
    }
    if (left < right) return 'correct'
    if (right < left) return 'wrong' 
  }
  return l.length < r.length ? 'correct' : 'wrong'
}

function compareInts(l, r) {
  return l < r ? 'correct' : 'wrong'
}

const correctIndices = []

let count = 1;
while (packets.length > 0) {
  const packet = packets.shift()
  let orderResolved = false
  const shortest = Math.min(packet.l.length, packet.r.length)
  for (let i = 0; i < shortest; i++) {

    if (packetType(packet.l[i]) === "num" && packetType(packet.r[i]) === "num") {
      if (packet.l[i] < packet.r[i]) {
        correctIndices.push(count)
        orderResolved = true
        break
      } else if (packet.l[i] > packet.r[i]) {
        orderResolved = true
        break
      } else {
        continue
      }
    }

    if (packetType(packet.l[i]) === "arr" && packetType(packet.r[i]) === "arr") {
      if (compareArrays(packet.l[i], packet.r[i]) === "correct") {
        correctIndices.push(count)
        orderResolved = true
        break
      } else if (compareArrays(packet.l[i], packet.r[i]) === "wrong") {
        orderResolved = true
        break
      } else {
        continue
      }
      
    }

    if (packetType(packet.l[i]) === "arr" && packetType(packet.r[i]) !== "arr") {
      if (compareArrays(packet.l[i], [packet.r[i]]) === "correct") {
        correctIndices.push(count)
        orderResolved = true
        break
      } else if (compareArrays(packet.l[i], packet.r[i]) === "wrong") {
        orderResolved = true
        break
      } else {
        continue
      }
      
    }

    if (packetType(packet.l[i]) !== "arr" && packetType(packet.r[i]) === "arr") {
      if (compareArrays([packet.l[i]], packet.r[i]) === "correct") {
        correctIndices.push(count)
        orderResolved = true
        break
      } else if (compareArrays(packet.l[i], packet.r[i]) === "wrong") {
        break
      } else {
        continue
      }
      
    }

  }
  if (!orderResolved) {
    if (packet.l.length < packet.r.length) correctIndices.push(count)
  }
  count++
}

const setOfCorrectIndices = new Set(correctIndices)
const unique = Array.from(setOfCorrectIndices)
console.log(unique)
console.log("A: Sum of indices of packets in right order:", unique.reduce((tot, i) => tot + i, 0)) 
/****************
 WRONG ANSWERS: *
 ****************
 * 12404 too high
 * 8781 too high
 * 8729 too high
 * 8421
 * 8172
 * 8005
 * 7742
 * 7714
 * 6331
 * 6090
 */
