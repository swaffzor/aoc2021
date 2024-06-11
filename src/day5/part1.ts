import * as fs from 'fs'

export interface Point {
  x: number,
  y: number,
  diag: number
}

export interface Line {
  start: Point,
  end: Point
}

const inputArray: string[] = fs.readFileSync('./src/day5/input.txt', 'utf8').split("\n")

export const parseInput =(input: string[]) => {
  return input.map(line => line.split(" -> ")).map(line => {
    const [start, end] = line.map(point => {
      const [x, y] = point.split(",").map(p => Number(p))
      return {x, y} as Point
    })
    return {start, end} as Line
  })
}

export const getBounds = (lines: Line[]) => {
  let width = 0
  let height = 0

  lines.forEach(line => {
    if (line.end.x >= line.start.x && line.end.x >= width) {
      width = line.end.x
    }
    if (line.start.x >= line.end.x && line.start.x >= width) {
      width = line.start.x
    }
    if (line.end.y >= line.start.y && line.end.y >= height) {
      height = line.end.y
    }
    if (line.start.y >= line.end.y && line.start.y >= height) {
      height = line.start.y
    }
  })

  // console.log( JSON.stringify({width, height}, null, 2))
  return [width, height]
}

export const generateGrid = (width: number, height: number): number[][] => {
  return new Array(width+1).fill(0).map(idk => {
    return new Array(height+1).fill(0)
  })
}

export const drawLines = (lines: Line[], emptyGrid: number[][]) => {
  const grid = [...emptyGrid]
  lines.forEach(line => {
    const axis = line.end.x === line.start.x ? "y" : line.end.y === line.start.y ? "x" : "diag"
    const direction = line.end[axis] - line.start[axis] > 0 ? 1 : -1 
    const bounds = axis == "x" ? Math.abs(line.end.x - line.start.x) : Math.abs(line.end.y - line.start.y)

    let x = 0
    let y = 0
    if (axis !== "diag") {
      for(let i=0; i<=bounds; i++) {
        x = line.start.x + (axis === "x" ? direction * i : 0)
        y = line.start.y + (axis === "y" ? direction * i : 0)
        grid[y][x] += 1
      }
    } else {
      const xDirection = line.end.x - line.start.x > 0 ? 1 : -1
      const yDirection = line.end.y - line.start.y > 0 ? 1 : -1

      for(let i=0; i<=bounds; i++) {
        x = line.start.x + xDirection * i
        y = line.start.y + yDirection * i
        grid[y][x] += 1
      }
    }
  })
  return grid
}

export const countPoints = (gridInput: number[][]) => {
  let count = 0
  gridInput.forEach((row, index) => {
    row.forEach(point => {
      count += point > 1 ? 1 : 0
    })
  })
  return count
}

export const part1 = () => {
  const lines = parseInput(inputArray)
  const [x, y] = getBounds(lines)
  const emptyGrid = generateGrid(x, y)
  const grid = drawLines(lines, emptyGrid)
  const count = countPoints(grid)
  console.log(count);
}

console.log(part1());
