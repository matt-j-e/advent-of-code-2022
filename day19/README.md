# AOC2022 Day 19

**Another failed attempt**

I think my code works to step through the minutes and build robots as soon as enough materials are available. But that won't produce the optimal outcome. Test blueprint 1, for example, ends up building loads of clay robots and never progresses beyond there because clay robots cost just 2 ore so can be built every couple of minutes.

### Observations
---

- Hash tables were not the best choice of data structure. Plain old objects would have been better I think - require less code to update
- I haven't worked out how to implement either a BFS or DFS algorithm for this problem.
- Actually, now I've written that down, I think it's a **binary tree problem**:
  - at every point that we can afford to build a robot we have two choices:
    - to build, or
    - not to build
  - each choice not to build might give rise to further build / don't build choices etc etc
- Ok, more thoughts, it is a tree structure but not a binary tree
  - At each branch we could do nothing or build one of up to 4 robots

---
-- 30/12/2022: WATCHED EXPLANATION OF SOLUTION ON YOU TUBE --

---

Traversing the whole tree isn't possible.

In Part One we have 24 iterations. That gives 24^9 leaves (quadrillions)

**DFS** solution will avoid running out of memory - 24 minutes deep = max of 24 recursions =  no memory problem

## SOLUTION TO PART ONE
A DFS solution based heavily on hyper-neutrion's Python solution here: https://www.youtube.com/watch?v=H3PSODv4nf0 and https://github.com/hyper-neutrino/advent-of-code/blob/main/2022/day19p1.py

Included optimisations:

Optimisations:
1. Never want more robots than the spend rate
   eg. can spend a maximum of 4 Ore per minute, there's no point having more than 4 ore robots
2. Jump ahead in time to build robots rather than step 1 minute at a time thereby removing all of the intermediate iterations/recursions
3. If you couldn't possibly spend all of the resources that you have by the end of the time (eg with 10 minutes to go you could spend a maximum of 40 Ore) get rid of the excess
   This leads to states being returned from a cache rather than being recalculated
   Remember - DON'T THROW AWAY GEODES - EVER

