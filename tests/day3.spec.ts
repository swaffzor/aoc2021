import { test, expect } from "@jest/globals"
import { bitsToInt, calcCommonBit, calcEpsilon, calcGamma, calcPower }from "../src/day3/part1"
import { calcCarbonDioxideRating, calcOxygenRating, lifeSupportRating } from "../src/day3/part2"

const input = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
]

test.skip.each([[0,5,7], [1,7,5], [2,4,8], [3,5,7], [4,7,5]])("calculates common bits %i", (bitPosition, exp0, exp1) => {
  const bits = calcCommonBit(input, bitPosition)
  expect(bits["0"]).toBe(exp0)
  expect(bits["1"]).toBe(exp1)
})

test.skip("calcGamma", () => {
  expect(calcGamma(input)).toBe("10110")
})

test.skip("calcEpsilon", () => {
  expect(calcEpsilon(input)).toBe("01001")
})

test.skip("bitsToInt", () => {
  expect(bitsToInt("10110")).toBe(22)
  expect(bitsToInt("01001")).toBe(9)
})

test.skip("calcPower", () => {
  expect(calcPower(input)).toBe(198)
})

test.skip("calcOxygenRating", () => {
  expect(calcOxygenRating(input)).toBe(23)
})

test.skip("calcCarbonDioxideRating", () => {
  expect(calcCarbonDioxideRating(input)).toBe(10)
})

test.skip("lifeSupportRating", () => {
  expect(lifeSupportRating(input)).toBe(230)
})
