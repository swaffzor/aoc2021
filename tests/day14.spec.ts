import { countOccurance, getCommonElements, Pair, parseInput, processRules, repeatProcess } from "../src/day14/part1"
import * as fs from 'fs'
import { deepEqual } from "assert"

const inputArray: string[] = fs.readFileSync('./src/day14/sampleInput.txt', 'utf8').split("\n")
const {template, rules} = parseInput(inputArray)

test("processRules", () => {
  expect(processRules(template, [{adjacent: "NN", insert: "C", index: -1}])).toBe("NCNCB")
  expect(processRules(template, rules)).toBe("NCNBCHB")
})

test("step 3", () => {
  expect(repeatProcess(2, template, rules)).toBe("NBCCNBBBCBHCB")
})

test("3 steps", () => {
  expect(repeatProcess(1, "NBCCNBBBCBHCB", rules)).toBe("NBBBCNCCNBBNBNBBCHBHHBCHB")
})

test("3 steps", () => {
  expect(repeatProcess(3, template, rules)).toBe("NBBBCNCCNBBNBNBBCHBHHBCHB")
})

test("4 steps", () => {
  expect(repeatProcess(4, template, rules)).toBe("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB")
})

test("5 steps length", () => {
  expect(repeatProcess(5, template, rules).length).toBe(97)
})

test("10 steps length", () => {
  expect(repeatProcess(10, template, rules).length).toBe(3073)
})

test("getCommonElements", () => {
  const polymer = repeatProcess(10, template, rules)
  deepEqual(getCommonElements(polymer), {most: 1749, least: 161})
})

test.only("processRules", () => {
  // expect(countOccurance(template, [{adjacent: "NN", insert: "C", index: -1}])).toBe("NCNCB")
  // expect(countOccurance(template, rules)).toBe("NCNBCHB")

  let pairCount: Pair = {}
  for (let i=0; i<10; i++) {
    const temp = countOccurance(template, rules)
    const counts = Object.entries(temp).forEach(rule => {
      if (pairCount[rule[0]] >= 0) {
        pairCount[rule[0]]+= rule[1]
      } else {
        pairCount[rule[0]] = rule[1]
      }
    })

  }
  expect(pairCount).toBe(0)
})