import { deepEqual } from "assert"
import {countEasySegments} from "../src/day8/part1"
import {figureOutOneAndFour, figureOutTheRest, getOutPutReading} from "../src/day8/part2"

const input = [
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
  "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
  "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
  "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
  "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
  "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
  "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
  "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
  "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
  "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
]

test.skip("countEasySegments", () => {
  expect(countEasySegments(input)).toBe(26)
})

test("getUniqueSegment", () => {
  const reading = {
    in: "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab", 
    out: "cdfeb fcadb cdfeb cdbaf"
  }
  // deepEqual(figureOutOne(reading.in.split(" ")), ["a", "b"])
  // deepEqual(getOutPutReading(reading), [8,5,2,3,7,9,6,4,0,1])
  expect(getOutPutReading(reading)).toBe(5353)
})

test("figure out the rest", () => {
  expect(figureOutTheRest(input)).toBe(61229)
})