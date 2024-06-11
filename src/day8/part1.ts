import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day8/input.txt', 'utf8').split("\n")
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe

const digits = [
  ["a","b","c","e","f","g"],      // 0  6
  ["c","f"],                      // 1 *2
  ["a","c","d","e","g"],          // 2  5
  ["a","c","d","f","g"],          // 3  5
  ["b","c","d","f"],              // 4 *4
  ["a","b","d","f","g"],          // 5  5
  ["a","b","d","e","f","g"],      // 6  6
  ["a","c","f"],                  // 7 *3
  ["a","b","c","d","e","f","g"],  // 8 *7
  ["a","b","c","d","f","g"],      // 9  6
]

export const parseReadings = (input: string[]) => {
  return input.map(line => {
    const [displayInput, displayOutput] = line.split(" | ")
    return {in: displayInput, out: displayOutput}
  })
}

export const countEasySegments = (input: string[]) => {
  const readings = parseReadings(input).map(reading => reading.out.split(" ")).flat()

  return readings.reduce((prev, curr) => {
    switch (curr.length) {
      case 2:
      case 3:
      case 4:
      case 7:
        return 1 + prev
      default:
        return prev
    }
  }, 0)
}

console.log(countEasySegments(inputArray));
