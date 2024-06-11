import * as fs from 'fs'

const inputArray: number[][] = fs.readFileSync('./src/day9/input.txt', 'utf8').split("\n").map(line => line.split("").map(n => Number(n)))

interface Point 
  {x: number, y: number, value: number}

export const findLowest = (input: number[][]) => {
  let hits = []
  for (let yAxis = 0; yAxis < input.length; yAxis++) {
    const row = input[yAxis]
    const rowAbove = yAxis === 0 ? undefined : input[yAxis-1]
    const rowBelow = yAxis+1 === input.length ? undefined : input[yAxis+1]
    for (let xAxis = 0; xAxis < row.length; xAxis++) {
      const spot = row[xAxis];
      const above = rowAbove ? rowAbove[xAxis] > spot : true
      const below = rowBelow ? rowBelow[xAxis] > spot: true
      const left = xAxis === 0 ? true : row[xAxis-1] > spot
      const right = xAxis+1 === row.length ? true : row[xAxis+1] > spot
      if (above && below && left && right) {
        hits.push({x: xAxis, y: yAxis, value: spot})
      }
    }
  }
  return hits
}

export const calcRisk = (lowPoints: Point[]) => 
  lowPoints.reduce((sum, curr) => {
    return sum + curr.value + 1
  }, 0)

export const checkHorizontal = (row: number[]) => 
  row.map((num, index, self) => {
    // check to the right
    if ((index+1 === self.length) || num < self[index+1]) {
      // check to the left
      if (index === 0 || (index-1 >= 0 && num < self[index-1])) {
        return 1
      }
    }
    return 0
  })

const part1 = () => {
  console.log(calcRisk(findLowest(inputArray)))
}

export const getBasinPointNeighbors = (point: Point, input: number[][]) => {
  const basinPoints: Point[] = []

  const left = point.x - 1 >= 0 && input[point.y][point.x - 1]
  const right = point.x + 1 < input[point.y].length && input[point.y][point.x + 1]
  const above = point.y - 1 >= 0 && input[point.y - 1][point.x]
  const below =  point.y + 1 < input.length && input[point.y + 1][point.x]

  if (point.value < left && left < 9) {
    basinPoints.push({x: point.x - 1, y: point.y, value: input[point.y][point.x-1] })
  }
  if (point.value < right && right < 9) {
    basinPoints.push({x: point.x + 1, y: point.y, value: input[point.y][point.x+1] })
  }
  if (point.value < above && above < 9) {
    basinPoints.push({x: point.x, y: point.y - 1, value: input[point.y-1][point.x] })
  }
  if (point.value < below && below < 9) {
    basinPoints.push({x: point.x, y: point.y + 1, value: input[point.y+1][point.x] })
  }

  
  return basinPoints
}

export const getBasinPoints = (point: Point, input: number[][]) => {
    const basin = [point]
    for (let i=0; i<basin.length; i++) {
      // basin.forEach(basinPoint => {
        const neighbors = getBasinPointNeighbors(basin[i], input)
        basin.push(...neighbors)
      }
      
      return basin.filter((value: Point, index: number, self: Point[]) =>
        index === self.findIndex((p) => p.x === value.x && p.y === value.y)
      )
}

export const getBasin = (points: Point[], input: number[][]) => {
  const basin = points.map(point => {
    const temp = getBasinPoints(point, input)
    return temp.length
  })
  return basin
}

export const calcAnswer = (basinSizes: number[]) => 
  basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((prod, curr) => prod*curr , 1)

const part2 = () => {
  const points = findLowest(inputArray)
  const basins = getBasin(points, inputArray)
  console.log(calcAnswer(basins));
  
}
part2()