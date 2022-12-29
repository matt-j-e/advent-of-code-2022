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

function bothNumbers(a, b) {
  return typeof a === "number" && typeof b === "number"
}

function compare(l, r) {
  /**
   * THIS NEXT LINE WAS THE THING THAT I CHANGED TO GET IT TO WORK.
   * Previously the number of loop iterations was set by the
   * SHORTEST array. I was then trying to look later at arrays
   * that still had elements. It failed to work on some occasions
   * 
   * This is a much neater approach. JavaScript doesn't care if you
   * try to access a non-existent array element: it's just 'undefined'
   */
  const longest = Math.max(l.length, r.length)

  for (let i = 0; i < longest; i++) {

    if (l[i] === undefined) {
      return true
    } else if (r[i] === undefined) {
      return false
    }

    if (bothNumbers(l[i], r[i])) {
      if (l[i] < r[i]) {
        return true
      } else if (r[i] < l[i]) {
        return false
      } else {
        continue
      }
    }

    if (Array.isArray(l[i]) && Array.isArray(r[i])) {
      let substep = compare(l[i], r[i])
      if (substep !== null) {
        return substep
      }
    } else if (Array.isArray(l[i]) && !Array.isArray(r[i])) {
      let substep = compare(l[i], [r[i]])
      if (substep !== null) {
        return substep
      }
    } else if (!Array.isArray(l[i]) && Array.isArray(r[i])) {
      let substep = compare([l[i]], r[i])
      if (substep !== null) {
        return substep
      }
    }
  }
  return null
}

let packetsInCorrectOrder = []
for (let i = 0; i < packets.length; i++) {
  const result = compare(packets[i].l, packets[i].r)
  if (result === true) {
    packetsInCorrectOrder.push(i + 1)
  } else if (result === null) {
    throw new Error(`Failed to compare:\n${JSON.stringify(packets[i].l)}\n${JSON.stringify(packets[i].r)}`)
  }
}

// console.log(packetsInCorrectOrder)
console.log("A: Sum of indices of packets in right order:", packetsInCorrectOrder.reduce((tot, i) => tot + i, 0)) // 5340

/******************************
 *** PART ONE WRONG ANSWERS ***
 ******************************
 * 12404 too high
 * 8781 too high
 * 8729 too high
 * 8421
 * 8172
 * 8005
 * 7949
 * 7742
 * 7714
 * 7408
 * 6331
 * 6090
 * 5652
 * 5486
 * 5478
 */

const packetsAll = [[[2]], [[6]]]
for (let i = 0; i < lines.length; i++) {
  packetsAll.push(JSON.parse(lines[i]))
}

packetsAll.sort((a, b) => {
  const comparison = compare(a, b)
  if (comparison === true) {
    return -1
  } else if (comparison === false) {
    return 1
  } else {
    return 0
  }
})

const packetsAllStrings = packetsAll.map(el => JSON.stringify(el))

const divider2Index = packetsAllStrings.indexOf('[[2]]');
const divider6Index = packetsAllStrings.indexOf('[[6]]');
console.log('B: Decoder key for distress signal:', (divider2Index + 1) * (divider6Index + 1)); // 21276