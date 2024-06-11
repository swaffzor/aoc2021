import { deepEqual } from "assert"
import {spawnCountdown} from "../src/day6/part1"
import {doTheMath, groupCountdowns, shiftLeft} from "../src/day6/part2"

const input = [3,4,3,1,2]

test("spawnCountdown after 18 days", () => {
  expect(spawnCountdown(input, 18)).toBe(26)
})

test("spawnCountdown after 80 days", () => {
  expect(spawnCountdown(input, 80)).toBe(5934)
})

test("groupCountdowns", () => {
  deepEqual(groupCountdowns(input), [, 1, 1, 2, 1])
})

test("shiftLeft", () => {
  const grouped = groupCountdowns(input)
  deepEqual(shiftLeft(grouped), [1,1,2,1,0,0,0,0,0])
})

test("doTheMath at 18 days", () => {
  const expected = [3,5,3,2,2,1,5,1,4]
  const grouped = groupCountdowns(input)
  expect(doTheMath(grouped, 18)).toBe(26)
})

test("doTheMath at 80 days", () => {
  const grouped = groupCountdowns(input)
  expect(doTheMath(grouped, 80)).toBe(5934)
})

// test("doTheMath", () => {
//   const grouped = groupCountdowns(input)
//   expect(doTheMath(grouped, 80)).toBe(5934)
// })