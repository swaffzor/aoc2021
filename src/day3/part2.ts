import * as fs from 'fs'
import { bitsToInt, calcCommonBit } from './part1'

const inputArray: string[] = fs.readFileSync('./src/day3/input.txt', 'utf8').split("\n")

export const calcOxygenRating = (input: string[]): number => {
  const bitsInString = input[0].length
  let filtered = [...input]
  for (let bitPosition = 0; bitPosition < bitsInString; bitPosition++) {
    if (filtered.length === 1) return bitsToInt(filtered[0])
    const commonBitsCount = calcCommonBit(filtered, bitPosition)
    const mostCommonValue = commonBitsCount[0] > commonBitsCount[1] ? "0": "1"
    filtered = filtered.filter(bitstring => bitstring.charAt(bitPosition) === mostCommonValue)
  }
  return bitsToInt(filtered[0])
}

export const calcCarbonDioxideRating = (input: string[]): number => {
  const bitsInString = input[0].length
  let filtered = [...input]
  for (let bitPosition = 0; bitPosition < bitsInString; bitPosition++) {
    if (filtered.length === 1) return bitsToInt(filtered[0])
    const commonBitsCount = calcCommonBit(filtered, bitPosition)
    const leastCommonValue = commonBitsCount[0] > commonBitsCount[1] ? "1": "0"
    filtered = filtered.filter(bitstring => bitstring.charAt(bitPosition) === leastCommonValue)
  }
  return bitsToInt(filtered[0])
}

export const lifeSupportRating = (input: string[]) => {
  const o2 = calcOxygenRating(input)
  const cO2 = calcCarbonDioxideRating(input)
  return o2 * cO2
}

console.log(lifeSupportRating(inputArray));
