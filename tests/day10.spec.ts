import { deepEqual } from 'assert'
import {calcIncompleteScore, calcScore, Closer, findMiddleScore, getCorruptedAndIncompleteChunks} from '../src/day10/part1'

const input = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
]

test("get corrupted chunk", () => {
  expect(getCorruptedAndIncompleteChunks([input[2]])["corrupted"].length).toBe(1)
})

test("get corrupted chunks", () => {
  const corrupted = getCorruptedAndIncompleteChunks(input)["corrupted"]
  expect(corrupted.length).toBe(5)
  deepEqual(corrupted, ["}" ,")", "]", ")", ">"])
})

test("calcScore", () => {
  const corrupted = getCorruptedAndIncompleteChunks(input)["corrupted"]
  expect(calcScore(corrupted)).toBe(26397)
})

test("get incomplete chunks", () => {
  const corrupted = getCorruptedAndIncompleteChunks(input)["incomplete"]
  const incomplete = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "(((({<>}<{<{<>}{[]{[]{}",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "<{([{{}}[<[[[<>{}]]]>[]]"
  ]
  expect(corrupted.length).toBe(5)
  deepEqual(corrupted, incomplete)
})

test("expected closers", () => {
  const expectedClosers = getCorruptedAndIncompleteChunks(input)["expectedClosers"]
  const expected = [
    "}}]])})]",
    ")}>]})",
    "}}>}>))))",
    "]]}}]}]}>",
    "])}>"
  ]
  expect(expectedClosers.length).toBe(5)
  deepEqual(expectedClosers, expected)
})

test("calc incomplete score", () => {
  const expectedClosers = getCorruptedAndIncompleteChunks(input)["expectedClosers"]
  expect(calcIncompleteScore(expectedClosers[4])).toBe(294)
  deepEqual(expectedClosers.map(c => calcIncompleteScore(c)), [288957, 5566, 1480781, 995444, 294])
})

test("middle score", () => {
  expect(findMiddleScore([288957, 5566, 1480781, 995444, 294])).toBe(288957)
})