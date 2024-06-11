import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day3/input.txt', 'utf8').split("\n")

export const calcCommonBit = (input: string[], bitPosition: number) => {
  const commonBitsCount = {
    "0": 0,
    "1": 0
  }

  input.forEach(value => {
    const bit: "0"|"1" = value.charAt(bitPosition) as "0"|"1"
    commonBitsCount[bit]++
  })

  return commonBitsCount
}

export const calcGamma = (input: string[]) => {
  const bitsInString = input[0].length
  let gamma = ""

  for (let i = 0; i < bitsInString; i++) {
    const commonBitsCount = calcCommonBit(input, i)
    gamma = gamma.concat(commonBitsCount[0] > commonBitsCount[1] ? "0" : "1")
  }
  return gamma
}

export const bitsToInt = (bits: string) => {
  let sum = 0
  for (let index = bits.length-1; index >= 0; index--) {
    const bit = bits.charAt(index)
    sum += Math.pow(2, bits.length - 1 - index) * Number(bit)
  }
  return sum
}

export const calcEpsilon = (input: string[]) => {
  const bitsInString = input[0].length
  let epsilon = ""

  for (let i = 0; i < bitsInString; i++) {
    const commonBitsCount = calcCommonBit(input, i)
    epsilon = epsilon.concat(commonBitsCount[0] > commonBitsCount[1] ? "1" : "0")
  }
  return epsilon
}

export const calcPower = (input: string[]) => {
  const gamma = bitsToInt(calcGamma(input))
  const epsilon = bitsToInt(calcEpsilon(input))
  return gamma * epsilon
}

console.log(calcPower(inputArray));
