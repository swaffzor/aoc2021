import { deepEqual } from "assert"
import {buildGrid, moveAcrossFold} from "../src/day13/part1"

const input = [
  {x: 6, y: 10},
  {x: 0, y: 14},
  {x: 9, y: 10},
  {x: 0, y: 3},
  {x: 10, y: 4},
  {x: 4, y: 11},
  {x: 6, y: 0},
  {x: 6, y: 12},
  {x: 4, y: 1},
  {x: 0, y: 13},
  {x: 10, y: 12},
  {x: 3, y: 4},
  {x: 3, y: 0},
  {x: 8, y: 4},
  {x: 1, y: 10},
  {x: 2, y: 14},
  {x: 8, y: 10},
  {x: 9, y: 0},
]
test.skip("buildGrid", () => {
  buildGrid(input)
})

test("moveAcrossFold y=7", () => {
  const expected = [
    ["#",".","#","#",".",".","#",".",".","#",".",],
    ["#",".",".",".","#",".",".",".",".",".",".",],
    [".",".",".",".",".",".","#",".",".",".","#",],
    ["#",".",".",".","#",".",".",".",".",".",".",],
    [".","#",".","#",".",".","#",".","#","#","#",],
    [".",".",".",".",".",".",".",".",".",".",".",],
    [".",".",".",".",".",".",".",".",".",".",".",],
  ]
  
  const points = moveAcrossFold(input, "y", 7)
  const grid = buildGrid(points, 6)
  deepEqual(grid, expected)
})

test("moveAcrossFold x=5", () => {
  const pointsInput = [
    {x: 6,y: 4,},
    {x: 0,y: 0,},
    {x: 9,y: 4,},
    {x: 0,y: 3,},
    {x: 10,y: 4,},
    {x: 4,y: 3,},
    {x: 6,y: 0,},
    {x: 6,y: 2,},
    {x: 4,y: 1,},
    {x: 0,y: 1,},
    {x: 10,y: 2,},
    {x: 3,y: 4,},
    {x: 3,y: 0,},
    {x: 8,y: 4,},
    {x: 1,y: 4,},
    {x: 2,y: 0,},
    {x: 8,y: 4,},
    {x: 9,y: 0,},
  ]
  const expected = [
    ["#","#","#","#","#"],
    ["#",".",".",".","#"],
    ["#",".",".",".","#"],
    ["#",".",".",".","#"],
    ["#","#","#","#","#"],
    [".",".",".",".","."],
    [".",".",".",".","."],
  ]
  
  const points = moveAcrossFold(pointsInput, "x", 5)
  const grid = buildGrid(points, 6, 4)
  deepEqual(grid, expected)
  expect(points.length - 1).toBe(17)
})
