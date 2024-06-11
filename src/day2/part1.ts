import * as fs from 'fs'

let input: string[] = fs.readFileSync('day2/input.txt', 'utf8').split("\n")
let depth = 0
let horizontal = 0

input.forEach(instruction => {
  const [direction, magnitude] = instruction.split(" ")
  const value = Number(magnitude)

  switch (direction) {
    case "forward":
      horizontal += value
      break;
    case "down":
      depth += value
      break;
    case "up":
      depth -= value
      break;
    default:
      break;
  }
})

console.log(`depth: ${depth}, horizontal: ${horizontal}`);
console.log(depth * horizontal);

