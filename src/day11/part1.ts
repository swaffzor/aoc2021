import * as fs from 'fs'
import { constructGrid, getPointNeighbors, increasePoint } from './part1-attempt1'

export type Row = number[]
export type Grid = Row[]
export interface Point 
  {x: number, y: number, v: number, flashed?: boolean}

const inputArray: Grid = fs.readFileSync('./src/day11/input.txt', 'utf8').split("\n")
  .map(row => row.split("").map(n => Number(n)))

export const increaseOctopusEnergy = (grid: Grid) => 
  grid.map(row => 
    row.map(spot => spot + 1)
  )

export const detectFlashes = (grid: Grid) => {
  let flashes = 0
  let pointsToFlash: Point[] = []

  grid.forEach((row, yAxis) => row.forEach((spot, xAxis) => {
    if (spot > 9) {
      flashes++
      pointsToFlash.push({x: xAxis, y: yAxis, v: spot, flashed: false})
    }
  }))

  return pointsToFlash
}

export const removeDuplicates = (value: Point, index: number, self: Point[]) =>
index === self.findIndex((p) => p.x === value.x && p.y === value.y)

export const aFunc = (grid: Grid) => {

}

export const main = (grid: Grid) => {
  const flashed: Point[] = []

  const newGrid = increaseOctopusEnergy(grid)
  const pointsToFlash = detectFlashes(newGrid)
  flashed.push(...pointsToFlash.map(point => {
    return {...point, v: 0, flashed: true}
  }))

  const shocks = pointsToFlash.map(point => {
    return getPointNeighbors(point, newGrid)
  }).flat()
  .filter(removeDuplicates).map(point => {
    const flashed = point.v + 1 > 9 
    return {
      ...point,
      flashed,
      v: flashed ? 0 : point.v + 1
    }
  })


}

export const lastTry = (grid: Grid, steps?: number) => {
  const limit = steps ?? 1
  let flashCount = 0
  let myGrid: Grid = [...grid]
  
  
  for (let i=0; i<limit; i++) {
    myGrid = increaseOctopusEnergy(myGrid)
    let stepFlashCount = 0
    let allFlashed = false
    const spotCount = 100 // grid.reduce((prev, curr) => prev + curr.reduce((p, c) => p + 1), 0)

    do {
      myGrid.forEach((row, y) => {
        row.forEach((spot, x) => {
          if (spot > 9) {
            flashCount++
            stepFlashCount++
            const neighbors = getPointNeighbors({x, y, v: spot}, myGrid).map(neighbor => {
              return {
                ...neighbor,
                v: neighbor.v + 1
              }
            }).sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)
            neighbors.push({x, y, v: 0})
            myGrid = constructGrid(neighbors, myGrid)
          }
        })
      })
      allFlashed = stepFlashCount === spotCount
      if (allFlashed) 
        return {myGrid, flashCount, stepsToAllFlash: i + 1}
    } while (allFlashed || myGrid.some(row => row.some(p => p > 9)))
  }

  return {myGrid, flashCount}
}

const part1 = (grid: Grid) => {
  const {flashCount} = lastTry(grid, 100)
  console.log(flashCount)
}
const part2 = (grid: Grid) => {
  const {stepsToAllFlash} = lastTry(grid, 1000)
  console.log(stepsToAllFlash);
}
part2(inputArray)