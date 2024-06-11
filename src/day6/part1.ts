import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./src/day6/input.txt', 'utf8').split(",").map(n => Number(n))
const DAYS = [80, 256]

export const spawnCountdown = (input: number[], days: number) => {
  let lanternFish = [...input]

  for (let index = 0; index < days; index++) {
    let fishToAdd: number[] = []
    const newCounts = lanternFish.map(fish => {
      if (fish > 0) {
        fish--
      } else {
        fish = 6
        fishToAdd.push(8)
      }
      return fish
    })
    newCounts.push(...fishToAdd)
    lanternFish = newCounts
  }
  return lanternFish.length
}

// console.log(spawnCountdown(inputArray, DAYS[0]));
