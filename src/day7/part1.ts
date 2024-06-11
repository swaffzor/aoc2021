import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./src/day7/input.txt', 'utf8').split(",").map(n => Number(n))

export const calcDistances = (positions: number[], destination: number) => {
  const distances = positions.map(position => Math.abs(destination - position))
  return distances
}

export const getTotalFuelCost = (distances: number[]) => {
  return distances.reduce((prev, curr) => prev + curr)
}

export const calcCrabRange = (positions: number[]) => {
  return [Math.min(...positions), Math.max(...positions)]
}

export const calcCostAtEveryPosition = (crabs: number[]) => {
  const range = calcCrabRange(crabs)

  const costAtEachPosition = crabs.map(crab => {
    const distances = calcDistances(crabs, crab)
    return getTotalFuelCost(distances)
  })
  const cheapest = calcCheapestPosition(costAtEachPosition)
  return cheapest

}

export const calcCheapestPosition = (fuelCosts: number[]) => {
  return fuelCosts.reduce((prev, curr) => prev < curr ? prev : curr)
}

console.log(calcCostAtEveryPosition(inputArray));
