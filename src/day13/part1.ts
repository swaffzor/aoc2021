import * as fs from 'fs'

interface Point {
  x: number,
  y: number
}

interface FoldDirection {
  axis: "x"|"y",
  value: number
}

const [pointsRaw, directionsRaw] = fs.readFileSync('./src/day13/input.txt', 'utf8').split("\n\n")
const points = pointsRaw.split("\n").map(point => {
  const location = point.split(",")
  return {
    x: Number(location[0]),
    y: Number(location[1])
  }
})
const foldDirections: FoldDirection[] = directionsRaw.split("\n").map(direction => {
  const [temp, value] = direction.split("=")
  return {axis: temp.split(/([xy])/g)[1], value: Number(value)} as FoldDirection
})

export const buildGrid = (points: Point[], rows?: number, columns?: number) => {
  const width = columns ?? points.reduce((prev, curr) => prev.x > curr.x ? prev : curr).x
  const height = rows ?? points.reduce((prev, curr) => prev.y > curr.y ? prev : curr).y
  
  // let grid: string[][] = Array(height).fill([...Array(width).fill(".")])
  let grid: string[][] = []
  let row = Array(width+1).fill(" ")
  for (let i=0; i<height+1; i++) {
    grid.push([...row])
  }

  points.forEach(point => {
    grid[point.y][point.x] = "#"
  })

  return grid
}

export const moveAcrossFold = (points: Point[], axis: "x"|"y", foldLine: number) => {
  return points.map(point => {
    if (point[axis] < foldLine) {
      return point
    } else {
      const diff = point[axis] - foldLine
      point[axis] = foldLine - diff
      return point
    }
  })
}

const part1 = (points: Point[]) => {
  const result = moveAcrossFold(points, "x", 655)
  .filter((point, index, self) => index === self.findIndex(p => p.x === point.x && p.y === point.y))
  console.log(result.length);
}
// part1(points)

export const foldPaper = (points: Point[], directions: FoldDirection[]) => {
  let inputPoints = [...points]

  directions.forEach(direction => {
    inputPoints = moveAcrossFold(inputPoints, direction.axis, direction.value)
    .filter((point, index, self) => index === self.findIndex(p => p.x === point.x && p.y === point.y))
  })

  return inputPoints
}

const part2 = (points: Point[], instructions: FoldDirection[]) => {
  const message = foldPaper(points, instructions)
  const grid = buildGrid(message)
  console.log(JSON.stringify(grid));
}
part2(points, foldDirections)