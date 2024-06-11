import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./src/day6/input.txt', 'utf8').split(",").map(n => Number(n))
const DAYS = [80, 256]

export const groupCountdowns = (input: number[]) => {
  // let ageCounts: number[] = []
  let ageCounts = Array(9).fill(0)

  input.forEach(fish => {
    if (ageCounts[fish]) {
      ageCounts[fish]++
    } else {
      ageCounts[fish] = 1
    }
  })
  return ageCounts
}

export const shiftLeft = (input: number[]) => {
  let ageCounts = [...input]
  const numberOfNewSpawns = ageCounts[0]
  
  for (let i=0; i<ageCounts.length; i++) {
    if (i + 1 < ageCounts.length) {
      ageCounts[i] = ageCounts[i + 1]
    }
  }

  ageCounts[6] += numberOfNewSpawns
  ageCounts.splice(ageCounts.length-1, 1, numberOfNewSpawns)
  return ageCounts
}

export const doTheMath = (input: number[], days: number) => {
  let counts = [...input]
  for (let i=0; i<days; i++) {
    counts = [...shiftLeft(counts)]
  }

  return counts.reduce((curr, prev) => {
    return curr + prev
  })
}

const doTheWork = () => {
  const grouped = groupCountdowns(inputArray)
  const result = doTheMath(grouped, DAYS[1])
  console.log(result);
  
}

doTheWork()