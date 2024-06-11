import { deepEqual } from "assert"
import {findLowest, checkHorizontal, calcRisk, getBasinPointNeighbors, getBasinPoints, getBasin, calcAnswer} from "../src/day9/part1"

const input = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678"
].map(line => line.split("").map(n => Number(n)))

test("checkHorizontal", () => {
  deepEqual(checkHorizontal(input[0]), [0,1,0,0,0,0,0,0,0,1])
})

test("findLowest", () => {
  const expected = [
    {x: 1, y: 0, value: 1},
    {x: 9, y: 0, value: 0},
    {x: 2, y: 2, value: 5},
    {x: 6, y: 4, value: 5},
  ]
  const actual = findLowest(input)
  deepEqual(actual, expected)
})

test("calcRisk", () => {
  const points = [
    {x: 1, y: 0, value: 1},
    {x: 9, y: 0, value: 0},
    {x: 2, y: 2, value: 5},
    {x: 6, y: 4, value: 5},
  ]
  expect(calcRisk(points)).toBe(15)
})

test("getBasinPointNeighbors", () => {
  const points = [
    {x: 1, y: 0, value: 1},
    {x: 9, y: 0, value: 0},
    {x: 2, y: 2, value: 5},
    {x: 6, y: 4, value: 5},
  ]
  // getBasinPointNeighbors(points[1], input)
  getBasinPoints(points[0], input)
})

test("getBasin", () => {
  const points = [
    {x: 1, y: 0, value: 1},
    {x: 9, y: 0, value: 0},
    {x: 2, y: 2, value: 5},
    {x: 6, y: 4, value: 5},
  ]
  deepEqual(getBasin(points, input), [3, 9 ,14, 9])
})

test("calcAnswer", () => {
  expect(calcAnswer([3, 9, 14, 9])).toBe(1134)
})

// test("checkVertical", () => {
//   const expected = [
//     [0,1,0,0,0,0,0,0,0,1],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,1,0,0,0],
//   ]
//   deepEqual(checkVertical(), )
// })