import * as fs from 'fs'

let input: string[] = fs.readFileSync('day2/input.txt', 'utf8').split("\n")
let depth = 0
let horizontal = 0
let aim = 0

input.forEach(vector => {
  const [direction, magnitude] = vector.split(" ")
  const value = Number(magnitude)

  switch (direction) {
    case "forward":
      horizontal += value
      depth += aim * value
      break;
    case "down":
      aim += value
      break;
    case "up":
      aim -= value
      break;
    default:
      break;
  }
})

console.log(`depth: ${depth}, horizontal: ${horizontal}`);
console.log(depth * horizontal);

