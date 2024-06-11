import { test, expect } from "@jest/globals"
import { deepEqual } from "assert"
import {Board, calcSum, checkForHorizontalWin, checkForVerticalWin, getWinningScore, markAllBoards, markBoard, markSpot} from "../src/day4/part1"
import {getWinningBoards, markAllWinningBoards} from "../src/day4/part2"
import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day4/input.txt', 'utf8').split("\n\n")

const numbers = inputArray[0].split(",")
const boards = inputArray.slice(1).map(board => {
  return board.split('\n').map(row => row.split(/[ ]+/))
})

const inputNumbers = ["7","4","9","5","11","17","23","2","0","14","21","24","10","16","13","6","15","25","12","22","18","20","8","19","3","26","1"]
const inputBoards: Board[] = [
    [
      ["22", "13", "17", "11", "0"],
      ["8", "2", "23", "4", "24"],
      ["21", "9", "14", "16", "7"],
      ["6", "10", "3", "18", "5"],
      ["1", "12", "20", "15", "19"],
    ],
    [
      ["3", "15", "0", "2", "22"],
      ["9", "18", "13", "17", "5"],
      ["19", "8", "7", "25", "23"],
      ["20", "11", "10", "24", "4"],
      ["14", "21", "16", "12", "6"],
    ],
    [
      ["14", "21", "17", "24", "4"],
      ["10", "16", "15", "9", "19"],
      ["18", "8", "23", "26", "20"],
      ["22", "11", "13", "6", "5"],
      ["2", "0", "12", "3", "7"],
    ]
  ]


const expected = [
  [
    ["22", "13", "X", "X", "X"],
    ["8", "X", "X", "X", "X"],
    ["X", "X", "X", "16", "X"],
    ["6", "10", "3", "18", "X"],
    ["1", "12", "20", "15", "19"],
  ],
  [
    ["3", "15", "X", "X", "22"],
    ["X", "18", "13", "X", "X"],
    ["19", "8", "X", "25", "X"],
    ["20", "X", "10", "X", "X"],
    ["X", "X", "16", "12", "6"],
  ],
  [
    [ "X",  "X",  "X",  "X",  "X"],
    ["10", "16", "15",  "X", "19"],
    ["18",  "8",  "X", "26", "20"],
    ["22",  "X", "13",  "6",  "X"],
    [ "X",  "X", "12",  "3",  "X"],
  ]
]

test("markSpot", () => {
  deepEqual(markSpot(inputBoards[0], inputNumbers[0]),[
    ["22", "13", "17", "11",  "0"],
    [ "8",  "2", "23",  "4", "24"],
    ["21",  "9", "14", "16",  "X"],
    [ "6", "10",  "3", "18",  "5"],
    [ "1", "12", "20", "15", "19"],
  ])
})

test("checkForHorizontalWin", () => {
  const middleWinner: Board = [
    ["X", "13", "17", "11",  "0"],
    ["8",  "X", "23",  "4", "24"],
    ["X",  "X",  "X",  "X",  "X"],
    ["X", "10",  "X", "18",  "X"],
    ["X",  "X",  "X",  "X", "19"],
  ]
  const topWinner: Board = [
    ["X",  "X",  "X",  "X",  "X"],
    ["8",  "X", "23",  "4", "24"],
    ["X",  "X",  "X",  "X",  "X"],
    ["X", "10",  "X", "18",  "X"],
    ["X",  "X",  "X",  "X", "19"],
  ]
  const noWinner: Board = [
    ["22", "13", "17", "11",  "0"],
    [ "8",  "2", "23",  "4", "24"],
    ["21",  "9", "14", "16",  "X"],
    [ "6", "10",  "3", "18",  "5"],
    [ "1", "12", "20", "15", "19"],
  ]
  expect(checkForHorizontalWin(middleWinner)).toEqual(true)
  expect(checkForHorizontalWin(topWinner)).toEqual(true)
  expect(checkForHorizontalWin(noWinner)).toEqual(false)
})

test("checkForVerticalWin", () => {
  const noWinner: Board = [
    ["22", "13", "17", "11",  "0"],
    [ "8",  "2", "23",  "4", "24"],
    ["21",  "9", "14", "16",  "X"],
    [ "6", "10",  "3", "18",  "5"],
    [ "1", "12", "20", "15", "19"],
  ]
  const firstColumnWinner: Board = [
    ["X", "13", "17", "11",  "0"],
    [ "X",  "2", "23",  "4", "24"],
    ["X",  "9", "14", "16",  "X"],
    [ "X", "10",  "3", "18",  "5"],
    [ "X", "12", "20", "15", "19"],
  ]
  const secondColumnWinner: Board = [
    ["1", "X", "17", "11",  "0"],
    [ "1",  "X", "23",  "4", "24"],
    ["1",  "X", "14", "16",  "X"],
    [ "1", "X",  "3", "18",  "5"],
    [ "1", "X", "20", "15", "19"],
  ]
  const lastColumnWinner: Board = [
    ["22", "13", "17", "11",  "X"],
    [ "8",  "2", "23",  "4", "X"],
    ["21",  "9", "14", "16",  "X"],
    [ "6", "10",  "3", "18",  "X"],
    [ "1", "12", "20", "15", "X"],
  ]
  expect(checkForVerticalWin(firstColumnWinner)).toEqual(true)
  expect(checkForVerticalWin(secondColumnWinner)).toEqual(true)
  expect(checkForVerticalWin(lastColumnWinner)).toEqual(true)
  expect(checkForVerticalWin(noWinner)).toEqual(false)
})

test("markBoard", () => {
  const wanted = [
    ["22", "13", "17", "X", "0"],
    ["8", "2", "23", "X", "24"],
    ["21", "X", "14", "16", "X"],
    ["6", "10", "3", "18", "X"],
    ["1", "12", "20", "15", "19"],
  ]
  deepEqual(markBoard(inputBoards[0], inputNumbers.slice(0, 5)), {board: wanted, didWin: 0})
  deepEqual(markBoard(inputBoards[2], inputNumbers), {board: expected[2], didWin: 11})
})

test("markAllBoards", () => {
  deepEqual(markAllBoards(inputBoards, inputNumbers.slice(0, 12)), {markedBoards: expected, lastNumber: "-1"})
  deepEqual(markAllBoards(inputBoards, inputNumbers), {markedBoards: expected, lastNumber: "24"})
})

test("calcSum", () => {
  expect(calcSum(expected[2], "24")).toBe(4512)
})

test("win", () => {
  const dut = [
    [
      "61",
      "X",
      "X",
      "53",
      "83",
    ],
    [
      "32",
      "28",
      "X",
      "65",
      "X",
    ],
    [
      "63",
      "X",
      "X",
      "X",
      "6",
    ],
    [
      "92",
      "69",
      "X",
      "24",
      "55",
    ],
    [
      "59",
      "71",
      "X",
      "30",
      "33",
    ],
  ]
  expect(calcSum(dut, "14")).toBe(11536)
})

test("getWinningScore", () => {
  expect(getWinningScore(inputBoards, inputNumbers)).toBe(4512)
})

test("getWinningScore for part1", () => {
  expect(getWinningScore(boards, numbers)).toBe(11536)
})

test("markAllWinningBoards", () => {
  expect(markAllWinningBoards(inputBoards, inputNumbers)).toBe({boardsThatWon: expected[1], lastWinningSpot: "13"})
})

test("getWinningBoards", () => {
  expect(getWinningBoards(inputBoards, inputNumbers)).toBe(1924)
})
