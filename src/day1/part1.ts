import * as fs from 'fs'

let input: string[] = fs.readFileSync('day1/1.input', 'utf8').split("\n")

let increaseCount = 0
let previousValue = Number(input[0])


input.forEach(value => {
  const currentValue = Number(value)
  if (currentValue > previousValue) {
    increaseCount += 1
  }
  previousValue = currentValue
})
console.log(increaseCount);
