import { deepEqual } from "assert"
import {findFlashPoints, increasePower, increasePowerByRow, flashThePoints, constructGrid, getFlashPointNeighbors, increasePoint, increaseEnergy, step, stepMultiple, part1} from "../src/day11/part1-attempt1"
import {detectFlashes, increaseOctopusEnergy, lastTry, main} from "../src/day11/part1"
const input = [
  [5,4,8,3,1,4,3,2,2,3],
  [2,7,4,5,8,5,4,7,1,1],
  [5,2,6,4,5,5,6,1,7,3],
  [6,1,4,1,3,3,6,1,4,6],
  [6,3,5,7,3,8,5,4,7,8],
  [4,1,6,7,5,2,4,6,4,5],
  [2,1,7,6,8,4,1,7,2,1],
  [6,8,8,2,8,8,1,1,3,4],
  [4,8,4,6,8,4,8,5,5,4],
  [5,2,8,3,7,5,1,5,2,6]
]

test.skip("increasePowerByRow", () => {
  const expected =   [6,5,9,4,2,5,4,3,3,4]
  deepEqual(increasePowerByRow(input[0]), expected)
})

test.skip("increasePower", () => {
  const expected = [
    [6,5,9,4,2,5,4,3,3,4],
    [3,8,5,6,9,6,5,8,2,2],
    [6,3,7,5,6,6,7,2,8,4],
    [7,2,5,2,4,4,7,2,5,7],
    [7,4,6,8,4,9,6,5,8,9],
    [5,2,7,8,6,3,5,7,5,6],
    [3,2,8,7,9,5,2,8,3,2],
    [7,9,9,3,9,9,2,2,4,5],
    [5,9,5,7,9,5,9,6,6,5],
    [6,3,9,4,8,6,2,6,3,7]
  ]
  deepEqual(increasePower(input), expected)
})

test.skip("findFlashPoints", () => {
  const grid = [
    [1,1,1,1,1],
    [1,10,10,10,1],
    [1,10,1,10,1],
    [1,10,10,10,1],
    [1,1,1,1,1],
  ]
  const expected = [
    {x: 1, y: 1, v: 10},
    {x: 2, y: 1, v: 10},
    {x: 3, y: 1, v: 10},
    {x: 1, y: 2, v: 10},
    {x: 3, y: 2, v: 10},
    {x: 1, y: 3, v: 10},
    {x: 2, y: 3, v: 10},
    {x: 3, y: 3, v: 10},
  ]
  const result = findFlashPoints(grid)
  deepEqual(result, expected)
})

test.skip("neighborsExpected", () => {
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const points = [
    {x: 1, y: 1, v: 9},
    {x: 2, y: 1, v: 9},
    {x: 3, y: 1, v: 9},
    {x: 1, y: 2, v: 9},
    {x: 3, y: 2, v: 9},
    {x: 1, y: 3, v: 9},
    {x: 2, y: 3, v: 9},
    {x: 3, y: 3, v: 9},
  ]

  const result = getFlashPointNeighbors(points[0], grid).sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)
  const neighborsExpected = [
    {x: 0, y: 0, v: 1},
    {x: 0, y: 1, v: 1},
    {x: 0, y: 2, v: 1},
    {x: 1, y: 0, v: 1},
    {x: 1, y: 2, v: 9},
    {x: 2, y: 0, v: 1},
    {x: 2, y: 1, v: 9},
    {x: 2, y: 2, v: 1},
  ].sort((a, b) => a.x - b.x === 0 ? a.y - b.y : a.x - b.x)
  deepEqual(result, neighborsExpected)
})

test.skip("constructGrid", () => {
  const points = [
    {x: 0, y: 0, v: 0},
    {x: 0, y: 1, v: 1},
    {x: 0, y: 2, v: 2},
    {x: 1, y: 0, v: 3},
    {x: 1, y: 2, v: 4},
    {x: 2, y: 0, v: 5},
    {x: 2, y: 1, v: 6},
    {x: 2, y: 2, v: 7},
  ]
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const expectedGrid = [
    [0,3,5,1,1],
    [1,9,6,9,1],
    [2,4,7,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  deepEqual(constructGrid(points, grid), expectedGrid)
})

test.skip("increasePoint", () => {
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const expected = [
    [2,2,1,1,1],
    [2,10,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]

  deepEqual(increasePoint({x: 0, y: 0, v: 1}, grid), expected)
})

test.skip("increaseEnergy", () => {
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const expected = [
    [2,2,2,2,2],
    [2,10,10,10,2],
    [2,10,2,10,2],
    [2,10,10,10,2],
    [2,2,2,2,2],
  ]
  deepEqual(increaseEnergy(grid), expected)
})

test.skip("step", () => {
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const exptectedGrid = [
    [3,4,5,4,3],
    [4,0,0,0,4],
    [5,0,0,0,5],
    [4,0,0,0,4],
    [3,4,5,4,3],
  ]
  deepEqual(step(grid).gridUpdated, exptectedGrid)
})

test.skip("part1", () => {
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const expected = [
    [4,5,6,5,4],
    [5,1,1,1,5],
    [6,1,1,1,6],
    [5,1,1,1,5],
    [4,5,6,5,4],
  ]
  deepEqual(stepMultiple(grid, 2).updatedGrid, expected)
})

test.skip("part1 with sample input 1 step", () => {
  const expected = [
    [6,5,9,4,2,5,4,3,3,4],
    [3,8,5,6,9,6,5,8,2,2],
    [6,3,7,5,6,6,7,2,8,4],
    [7,2,5,2,4,4,7,2,5,7],
    [7,4,6,8,4,9,6,5,8,9],
    [5,2,7,8,6,3,5,7,5,6],
    [3,2,8,7,9,5,2,8,3,2],
    [7,9,9,3,9,9,2,2,4,5],
    [5,9,5,7,9,5,9,6,6,5],
    [6,3,9,4,8,6,2,6,3,7],
  ]
  deepEqual(stepMultiple(input, 1).updatedGrid, expected)
})

test.skip("step 2", () => {
  const expected = [
    [8,8,0,7,4,7,6,5,5,5],
    [5,0,8,9,0,8,7,0,5,4],
    [8,5,9,7,8,8,9,6,0,8],
    [8,4,8,5,7,6,9,6,0,0],
    [8,7,0,0,9,0,8,8,0,0],
    [6,6,0,0,0,8,8,9,8,9],
    [6,8,0,0,0,0,5,9,4,3],
    [0,0,0,0,0,0,7,4,5,6],
    [9,0,0,0,0,0,0,8,7,6],
    [8,7,0,0,0,0,6,8,4,8],
  ]
  deepEqual(stepMultiple(input, 2).updatedGrid, expected)
  })


test.skip("part1 with sample input flash count", () => {
  expect(part1(input, 10)).toBe(204)
})


test("increaseOctopusEnergy", () => {
  const expected = [
    [6,5,9,4,2,5,4,3,3,4],
    [3,8,5,6,9,6,5,8,2,2],
    [6,3,7,5,6,6,7,2,8,4],
    [7,2,5,2,4,4,7,2,5,7],
    [7,4,6,8,4,9,6,5,8,9],
    [5,2,7,8,6,3,5,7,5,6],
    [3,2,8,7,9,5,2,8,3,2],
    [7,9,9,3,9,9,2,2,4,5],
    [5,9,5,7,9,5,9,6,6,5],
    [6,3,9,4,8,6,2,6,3,7]
  ]
  deepEqual(increaseOctopusEnergy(input), expected)
})

test.skip("detectFlashes", () => {
  const grid = [
    [1,1,1,1,1],
    [1,10,10,10,1],
    [1,10,1,10,1],
    [1,10,10,10,1],
    [1,1,1,1,1],
  ]
  const expected = [
    {x: 1, y: 1, v: 10},
    {x: 2, y: 1, v: 10},
    {x: 3, y: 1, v: 10},
    {x: 1, y: 2, v: 10},
    {x: 3, y: 2, v: 10},
    {x: 1, y: 3, v: 10},
    {x: 2, y: 3, v: 10},
    {x: 3, y: 3, v: 10},
  ]
  const result = detectFlashes(grid)
  deepEqual(result, expected)
})

test.skip("last try", () => {
  // main(input)
  const grid = [
    [1,1,1,1,1],
    [1,9,9,9,1],
    [1,9,1,9,1],
    [1,9,9,9,1],
    [1,1,1,1,1],
  ]
  const grid1Step = [
    [3,4,5,4,3],
    [4,0,0,0,4],
    [5,0,0,0,5],
    [4,0,0,0,4],
    [3,4,5,4,3],
  ]

  const grid2Step = [
    [4,5,6,5,4],
    [5,1,1,1,5],
    [6,1,1,1,6],
    [5,1,1,1,5],
    [4,5,6,5,4],
  ]
  deepEqual(lastTry(grid), grid1Step)
  deepEqual(lastTry(grid1Step), grid2Step)
})
const afterStep1 = [
  [6,5,9,4,2,5,4,3,3,4],
  [3,8,5,6,9,6,5,8,2,2],
  [6,3,7,5,6,6,7,2,8,4],
  [7,2,5,2,4,4,7,2,5,7],
  [7,4,6,8,4,9,6,5,8,9],
  [5,2,7,8,6,3,5,7,5,6],
  [3,2,8,7,9,5,2,8,3,2],
  [7,9,9,3,9,9,2,2,4,5],
  [5,9,5,7,9,5,9,6,6,5],
  [6,3,9,4,8,6,2,6,3,7],
]
const afterStep2 = [
  [8,8,0,7,4,7,6,5,5,5],
  [5,0,8,9,0,8,7,0,5,4],
  [8,5,9,7,8,8,9,6,0,8],
  [8,4,8,5,7,6,9,6,0,0],
  [8,7,0,0,9,0,8,8,0,0],
  [6,6,0,0,0,8,8,9,8,9],
  [6,8,0,0,0,0,5,9,4,3],
  [0,0,0,0,0,0,7,4,5,6],
  [9,0,0,0,0,0,0,8,7,6],
  [8,7,0,0,0,0,6,8,4,8],
]
const afterStep3 = [
  [0,0,5,0,9,0,0,8,6,6],
  [8,5,0,0,8,0,0,5,7,5],
  [9,9,0,0,0,0,0,0,3,9],
  [9,7,0,0,0,0,0,0,4,1],
  [9,9,3,5,0,8,0,0,6,3],
  [7,7,1,2,3,0,0,0,0,0],
  [7,9,1,1,2,5,0,0,0,9],
  [2,2,1,1,1,3,0,0,0,0],
  [0,4,2,1,1,2,5,0,0,0],
  [0,0,2,1,1,1,9,0,0,0],
]
const afterStep4 = [
  [2,2,6,3,0,3,1,9,7,7],
  [0,9,2,3,0,3,1,6,9,7],
  [0,0,3,2,2,2,1,1,5,0],
  [0,0,4,1,1,1,1,1,6,3],
  [0,0,7,6,1,9,1,1,7,4],
  [0,0,5,3,4,1,1,1,2,2],
  [0,0,4,2,3,6,1,1,2,0],
  [5,5,3,2,2,4,1,1,2,2],
  [1,5,3,2,2,4,7,2,1,1],
  [1,1,3,2,2,3,0,2,1,1],
]
const afterStep5 = [
  [4,4,8,4,1,4,4,0,0,0],
  [2,0,4,4,1,4,4,0,0,0],
  [2,2,5,3,3,3,3,4,9,3],
  [1,1,5,2,3,3,3,2,7,4],
  [1,1,8,7,3,0,3,2,8,5],
  [1,1,6,4,6,3,3,2,3,3],
  [1,1,5,3,4,7,2,2,3,1],
  [6,6,4,3,3,5,2,2,3,3],
  [2,6,4,3,3,5,8,3,2,2],
  [2,2,4,3,3,4,1,3,2,2],
]
const afterStep6 = [
  [5,5,9,5,2,5,5,1,1,1],
  [3,1,5,5,2,5,5,2,2,2],
  [3,3,6,4,4,4,4,6,0,5],
  [2,2,6,3,4,4,4,4,9,6],
  [2,2,9,8,4,1,4,3,9,6],
  [2,2,7,5,7,4,4,3,4,4],
  [2,2,6,4,5,8,3,3,4,2],
  [7,7,5,4,4,6,3,3,4,4],
  [3,7,5,4,4,6,9,4,3,3],
  [3,3,5,4,4,5,2,4,3,3],
]
const afterStep7 = [
  [6,7,0,7,3,6,6,2,2,2],
  [4,3,7,7,3,6,6,3,3,3],
  [4,4,7,5,5,5,5,8,2,7],
  [3,4,9,6,6,5,5,7,0,9],
  [3,5,0,0,6,2,5,6,0,9],
  [3,5,0,9,9,5,5,5,6,6],
  [3,4,8,6,6,9,4,4,5,3],
  [8,8,6,5,5,8,5,5,5,5],
  [4,8,6,5,5,8,0,6,4,4],
  [4,4,6,5,5,7,4,6,4,4],
]
const afterStep8 = [
  [7,8,1,8,4,7,7,3,3,3],
  [5,4,8,8,4,7,7,4,4,4],
  [5,6,9,7,6,6,6,9,4,9],
  [4,6,0,8,7,6,6,8,3,0],
  [4,7,3,4,9,4,6,7,3,0],
  [4,7,4,0,0,9,7,6,8,8],
  [6,9,0,0,0,0,7,5,6,4],
  [0,0,0,0,0,0,9,6,6,6],
  [8,0,0,0,0,0,4,7,5,5],
  [6,8,0,0,0,0,7,7,5,5],
]
const afterStep9 = [
  [9,0,6,0,0,0,0,6,4,4],
  [7,8,0,0,0,0,0,9,7,6],
  [6,9,0,0,0,0,0,0,8,0],
  [5,8,4,0,0,0,0,0,8,2],
  [5,8,5,8,0,0,0,0,9,3],
  [6,9,6,2,4,0,0,0,0,0],
  [8,0,2,1,2,5,0,0,0,9],
  [2,2,2,1,1,3,0,0,0,9],
  [9,1,1,1,1,2,8,0,9,7],
  [7,9,1,1,1,1,9,9,7,6],
]
const afterStep10 = [
  [0,4,8,1,1,1,2,9,7,6],
  [0,0,3,1,1,1,2,0,0,9],
  [0,0,4,1,1,1,2,5,0,4],
  [0,0,8,1,1,1,1,4,0,6],
  [0,0,9,9,1,1,1,3,0,6],
  [0,0,9,3,5,1,1,2,3,3],
  [0,4,4,2,3,6,1,1,3,0],
  [5,5,3,2,2,5,2,3,5,0],
  [0,5,3,2,2,5,0,6,0,0],
  [0,0,3,2,2,4,0,0,0,0],
]
test("last try sample data", () => {
  
  deepEqual(lastTry(input).myGrid, afterStep1)
  deepEqual(lastTry(afterStep1).myGrid, afterStep2)
  deepEqual(lastTry(afterStep2).myGrid, afterStep3)
  deepEqual(lastTry(afterStep3).myGrid, afterStep4)
  deepEqual(lastTry(afterStep4).myGrid, afterStep5)
  deepEqual(lastTry(afterStep5).myGrid, afterStep6)
  deepEqual(lastTry(afterStep6).myGrid, afterStep7)
  deepEqual(lastTry(afterStep7).myGrid, afterStep8)
  deepEqual(lastTry(afterStep8).myGrid, afterStep9)
  deepEqual(lastTry(afterStep9).myGrid, afterStep10)
})

test("get correct count", () => {
  const result = lastTry(input, 10)
  deepEqual(result.myGrid, afterStep10)
  expect(result.flashCount).toBe(204)
})
test("get correct count after 100 steps", () => {
  const result = lastTry(input, 100)
  expect(result.flashCount).toBe(1656)
})

test.only("part2", () => {
  const {stepsToAllFlash} = lastTry(input, 200)
  expect(stepsToAllFlash).toBe(195)
})