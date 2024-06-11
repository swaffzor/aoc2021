import { deepEqual } from 'assert'
import * as fs from 'fs'
import {countPoints, drawLines, generateGrid, getBounds, Line, parseInput, part1} from '../src/day5/part1'

const inputArray: string[] = fs.readFileSync('./tests/sampleInput-day5.txt', 'utf8').split("\n")
const lines: Line[] = []
const expectedEmptyGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]
const filledGrid = [
  [0,0,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,0,0],
  [0,1,1,2,1,1,1,2,1,1],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [2,2,2,1,1,1,0,0,0,0],
]

beforeAll(() => {
  const tempLlines = parseInput(inputArray)
  const [x,y] = getBounds(lines)
  lines.push(...tempLlines)
})

test("getBounds", () => {
  deepEqual(getBounds(lines), [9, 9])
})

test("generateGrid", () => {
  const [width, height] = getBounds(lines)
  deepEqual(generateGrid(width, height), expectedEmptyGrid)
})

test("drawLines", () => {
  const [x,y] = getBounds(lines)
  const templines = [{
    start: {
      x: 1, y: 1, diag: 0
    }, 
    end: {
        x: 3, y: 3, diag: 0
    }
  },
  {
    start: {
      x: 9, y: 7, diag: 0
    }, 
    end: {
        x: 7, y: 9, diag: 0
    }
  }]
  deepEqual(drawLines(lines, generateGrid(x,y)), filledGrid)
})

test("countPoints", () => {
  expect(countPoints(filledGrid)).toBe(5)
})