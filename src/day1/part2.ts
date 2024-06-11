import * as fs from 'fs'

let input: number[] = fs.readFileSync('1.input', 'utf8').split("\n").map(val => Number(val))

const calcSum = (startIndex: number) => {
  if (startIndex + 3 > input.length) return 0
  const valueA = input[startIndex]
  const valueB = input[startIndex + 1]
  const valueC = input[startIndex + 2]
  const sum = valueA + valueB + valueC
  // console.log(`${valueA} + ${valueB} + ${valueC} = ${sum}`);
  return sum
}

let increaseCount = 0
let previousValue = calcSum(0)

input.forEach((value, index) => {
  const currentValue = calcSum(index)
  if (currentValue > previousValue) {
    increaseCount += 1
  }
  previousValue = currentValue
})
console.log(increaseCount);
