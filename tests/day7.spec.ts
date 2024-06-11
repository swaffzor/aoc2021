import { deepEqual } from "assert"
import {calcCostAtEveryPosition, calcDistances, getTotalFuelCost} from "../src/day7/part1"
import {calcCostAtEveryPosition2, calcCosts, getTotalFuelCost2} from "../src/day7/part2"
const input = [16,1,2,0,4,2,7,1,2,14]

test("calcFuelCost", () => {
  deepEqual(calcDistances(input, 2), [14,1,0,2,2,0,5,1,0,12])
})

test("getTotalFuelCost", () => {
  expect(getTotalFuelCost([14,1,0,2,2,0,5,1,0,12])).toBe(37)
})

test("calcCheapestPosition", () => {
  expect(calcCostAtEveryPosition(input)).toBe(37)
})

test("calcCosts", () => {
  deepEqual(calcCosts(input, 5), [66,10,6,15,1,6,3,10,6,45])
})

test("getTotalFuelCost2", () => {
  expect(getTotalFuelCost2([66,10,6,15,1,6,3,10,6,45])).toBe(168)
})

test("calcCostAtEveryPosition2", () => {
  expect(calcCostAtEveryPosition2(input)).toBe(168)
})