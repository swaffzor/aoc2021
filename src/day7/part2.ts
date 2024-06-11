import * as fs from 'fs'

const inputArray: number[] = fs.readFileSync('./src/day7/input.txt', 'utf8').split(",").map(n => Number(n))

export const calcDistances = (positions: number[], destination: number) => {
  return positions.map(position => Math.abs(destination - position))
}

export const getTotalFuelCost2 = (distances: number[]) => {
  return distances.reduce((prev, curr) => {
    return prev + curr
  })
}

export const calcCrabRange = (positions: number[]) => {
  return [Math.min(...positions), Math.max(...positions)]
}

export const calcCostAtEveryPosition2 = (crabs: number[]) => {
  const range = calcCrabRange(crabs)
  let fuelCosts: number[] = []

  for (let i =0; i<range[1]; i++) {
    const costs = calcCosts(crabs, i)
    fuelCosts.push(getTotalFuelCost2(costs))
  }

  return calcCheapestPosition(fuelCosts)
}

export const calcCheapestPosition = (fuelCosts: number[]) => {
  return fuelCosts.reduce((prev, curr) => prev < curr ? prev : curr)
}

export const calcCosts = (crabs: number[], destination: number) => 
  crabs.map(crab => {
    let distance = 0
    const bounds = Math.abs(destination-crab)
    for (let i=0; i<bounds; i++) {
      distance += 1 + i
    }
    return distance
  })

  console.log(calcCostAtEveryPosition2(inputArray));
  