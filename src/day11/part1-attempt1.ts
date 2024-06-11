import * as fs from 'fs'
import { Point } from './part1'

export type Row = number[]
export type Grid = Row[]
export interface Point1 
  {x: number, y: number, v: number}

const inputArray: Grid = fs.readFileSync('./src/day11/input.txt', 'utf8').split("\n")
  .map(row => row.split("").map(n => Number(n)))

export const increasePowerByRow = (row: Row) => row.map(spot => spot + 1)

export const increasePower = (grid: Grid): Grid => grid.map(row => increasePowerByRow(row))

export const findFlashPoints = (grid: Grid) => {
  const flashPoints: Point1[] = []
  grid.forEach((row, yAxis) => {
    row.forEach((spot, xAxis) => {
      spot > 9 && flashPoints.push({x: xAxis, y: yAxis, v: spot})
    })
  })
  return flashPoints
}

export const getPointNeighbors = (point: Point, grid: Grid, includeDiagonals = true) => {
  const neighbors: Point[] = []

  const left = point.x - 1 >= 0 && grid[point.y][point.x - 1]
  const right = point.x + 1 < grid[point.y].length && grid[point.y][point.x + 1]
  const above = point.y - 1 >= 0 && grid[point.y - 1][point.x]
  const below =  point.y + 1 < grid.length && grid[point.y + 1][point.x]

  const leftAbove = left !== false && above !== false && grid[point.y - 1][point.x - 1]
  const rightAbove = right !== false && above !== false && grid[point.y - 1][point.x + 1]
  const leftBelow = left !== false && below !== false && grid[point.y + 1][point.x - 1]
  const rightBelow = right !== false && below !== false && grid[point.y + 1][point.x + 1]

  if (left !== false) {
    neighbors.push({x: point.x - 1, y: point.y, v: left || -1 })
  }
  if (right !== false) {
    neighbors.push({x: point.x + 1, y: point.y, v: right || -1 })
  }
  if (above !== false) {
    neighbors.push({x: point.x, y: point.y - 1, v: above || -1 })
  }
  if (below !== false) {
    neighbors.push({x: point.x, y: point.y + 1, v: below || -1 })
  }
  if (includeDiagonals && leftAbove !== false) {
    neighbors.push({x: point.x - 1, y: point.y - 1, v: leftAbove || -1})
  }
  if (includeDiagonals && rightAbove !== false) {
    neighbors.push({x: point.x + 1, y: point.y - 1, v: rightAbove || -1})
  }
  if (includeDiagonals && leftBelow !== false) {
    neighbors.push({x: point.x - 1, y: point.y + 1, v: leftBelow || -1})
  }
  if (includeDiagonals && rightBelow !== false) {
    neighbors.push({x: point.x + 1, y: point.y + 1, v: rightBelow || -1})
  }

  return neighbors
}

let flashCount = 0
const flash = (point: Point1): Point1 => {
  if (point.v > 9) {
    // flashCount += 1
    return {...point, v: 0}
  } else {
    return {...point, v: point.v + 1}
  }
}

// .filter((v: Point1, index: number, self: Point1[]) =>
//   index === self.findIndex((p) => p.x === value.x && p.y === value.y)
// )
export const flashPoints = (points: Point1[], grid: Grid) => {
  let doNotFlashPoints: Point1[] = points.filter(point => point.v === 0)
  let pointsToFlash: Point1[] = points.filter(point => point.v > 0)

  // const neighbors: Point1[] = points.map(point => getFlashPointNeighbors(point, grid))
  // .flat()
  // .sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)

  const flashed = points.map(flash)
  const combined = flashed.reduce((combined, point, index, self) => {
    const samepoint = self.filter(p => p.x === point.x && p.y === point.y)
    const value = point.v + samepoint.length > 9 ? 0 : point.v + samepoint.length
    return [...combined, {...point, value}]
  }, flashed)

  // const pointsFlashed = candidates.reduce((flashed, point) => {
  //   const duplicatePoints = flashed.filter(iteratee => iteratee.x === point.x && iteratee.y === point.y)
  //   const pointsFiltered = flashed.filter(flashedPoint => !duplicatePoints.includes(flashedPoint))

  //   return [
  //     ...pointsFiltered, 
  //     {
  //       ...point, 
  //       v: point.v + duplicatePoints.length > 9 ? 0 : point.v + duplicatePoints.length
  //     }
  //   ]
  // }, [...candidates])
  // .sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)

  return flashed
}

export const flashThePoints = (points: Point1[], grid: Grid) => {
  let loop = true
  let pointsToFlash = [...points]
  let newGrid: Grid = [...grid]
  let pointsStayingAtZero: Point1[] = []

  do {
    const neighbors: Point1[] = points.map(point => getPointNeighbors(point, grid))
  .flat().filter(point => !pointsStayingAtZero.includes(point) )
    const flashed = flashPoints([...pointsToFlash, ...neighbors], newGrid)
    
    if (flashed.some(point => point.v === 0)) {
      pointsStayingAtZero.push(...flashed.filter(point => point.v === 0))
    } else {
      loop = false
    }
    
    const newPoints = flashed.map(point => {
      return pointsStayingAtZero.includes(point) ? {...point, v: 0} : point
    })
    newGrid = constructGrid(newPoints, grid)
    pointsToFlash = flashed.filter(point => !pointsStayingAtZero.includes(point))
  } while (loop);
}

export const constructGrid = (points: Point1[], grid: Grid) => {
  const newGrid = [...grid] as Grid
  points.forEach(point => {
    newGrid[point.y][point.x] = point.v
  })
  return newGrid
}

export const increasePoint = (point: Point1, grid: Grid) => {
  const neighbors = getPointNeighbors(point, grid)
  const flashed = [point, ...neighbors].map(point => {
    return {...point, v: point.v + 1}
  })
  
  return constructGrid(flashed, grid)
}

export const increaseEnergy = (grid: Grid) => {
  return grid.map(row => row.map(point => point + 1))
}

export const flashIfNeeded = (grid: Grid) => {

  const points = findFlashPoints(grid)

  const neighbors = points.map(point => {
    return getPointNeighbors(point, grid)
  })
  .flat()
  
  const uniquePoints = [...neighbors, ...points]
  .filter((point, index, self) => index === self.findIndex(p => p.x === point.x && p.y === point.y))
  .sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)
  .map(point => {
    const flashed = point.v > 9 
    // flashed && flashCount++
    return {
      ...point,
      v: flashed ? 0 : point.v + 1
    }
  })
  
  return constructGrid(uniquePoints, grid)
}

export const step = (grid: Grid) => {
  const increased = increaseEnergy(grid)
  const flashPoints = findFlashPoints(increased)
  .sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)
  const flashCount = flashPoints.length

  const updatedGrid = flashPoints.reduce((cumGrid, point) => {
    return increasePoint({...point, v: cumGrid[point.y][point.x]}, cumGrid)
  }, increased)

  const temp = flashCount > 0 ? flashIfNeeded(updatedGrid) : increased
  return {gridUpdated: temp.map(row => row.map(point => 
    point > 9 ? 0 : point
  )), flashCount}
}

export const stepMultiple = (grid: Grid, loops: number) => {
  let gridToStep = [...grid]
  let flashesToCount = 0

  for (let i=0; i<loops; i++) {
    const {gridUpdated, flashCount} = step(gridToStep)
    gridToStep = [...gridUpdated]
    flashesToCount += flashCount
  }

  return {updatedGrid: gridToStep, count: flashesToCount}
}

export const part1 = (grid: Grid, loops: number) => {
  const {updatedGrid, count} = stepMultiple(grid, loops)
  return count
}
