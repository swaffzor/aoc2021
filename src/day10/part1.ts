import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day10/input.txt', 'utf8').split("\n")

const openers: Opener[] = [
  '(', '[', '{', '<'
]
const closers: Closer[] = [
  ')', ']', '}', '>'
]
const points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

const incompletePoints = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

export const getCorruptedAndIncompleteChunks = (input: string[]) => {
  let corrupted: Closer[] = []
  let incomplete: string[] = []
  let expectedClosers: string[] = []

  input.forEach(line => {
    let expected: Closer[] = []
    let continueLoop = true

    line.split("")
    .forEach((char, index, self) => {
      if(continueLoop) {
        const cIndex = isOpener(char as Opener) 
          ? openers.findIndex(c => c === char) 
          : closers.findIndex(c => c === char)
        
        if (isOpener(char as Opener)) {
          expected.push(closers[cIndex])
        } else {
          if (expected.pop() !== char) {
            corrupted.push(char as Closer)
            continueLoop = false
          }
        }

        if (index === self.length - 1) {
          incomplete.push(line)
          expectedClosers.push(expected.reverse().join(""))
        }
      }
    })

  })

  return {corrupted, incomplete, expectedClosers}
}
export type Opener = "["|"("|"{"|"<"
export type Closer = "]"|")"|"}"|">"

export const calcScore = (illegals: Closer[]) => 
  illegals.map(illegal => points[illegal]).reduce((sum, curr) => sum + curr, 0)

export const calcIncompleteScore = (chars: string) => {
  return chars.split("").map(char => incompletePoints[char as Closer]).reduce((total, curr) => {
    return total * 5 + curr
  }, 0)
}

export const findMiddleScore = (scores: number[]) => {
  const sorted = scores.sort((a, b) => a - b)
  return sorted[(sorted.length-1)/2 ]
}

export const isOpener = (char: Opener) => openers.includes(char)
export const isCloser = (char: Closer) => closers.includes(char)

export const part1 = (input: string[]) => {
  console.log(calcScore(getCorruptedAndIncompleteChunks(input)["corrupted"]))
}

export const part2 = (input: string[]) => {
  const incomplete = getCorruptedAndIncompleteChunks(input)
  const scores = incomplete.expectedClosers.map(c => calcIncompleteScore(c))
  const result = findMiddleScore(scores)
  console.log(result);
}
part2(inputArray)