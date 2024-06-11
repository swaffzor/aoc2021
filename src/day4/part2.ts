import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day4/input.txt', 'utf8').split("\n\n")


type Row = string[]
type Board = Row[]

const numbers = inputArray[0].split(",")
const boards = inputArray.slice(1).map(board => {
  return board.split('\n').map(row => row.split(/[ ]+/))
})

const markSpot = (board: Board, numberCalled: string) => {
  if (board === undefined) {
    console.log("shit");
  }
  
  if (board.some(row => row.includes("na"))) {
    return board
  }
  
  return board.map(row => {
    const index = row.findIndex(spot => spot === numberCalled)
    const rowCopy = [...row]
    if (index >= 0) {
      rowCopy.splice(index, 1, "X")
    }
    return rowCopy
  })
}

const checkForHorizontalWin = (board: Board) => {
    for (let index = 0; index < board.length; index++) {
      const filtered = board[index].filter(spot => spot === "X")
      if (filtered.length === 5) {
        return true
      }
    }
  return false
}

const checkForVerticalWin = (board: Board) => {
  for (let column = 0; column < board.length; column++) {
    let xCount = 0
    for (let rowIndex = 0; rowIndex < board[0].length; rowIndex++) {
      const row = board[rowIndex]
      const spot = row !== undefined ? row[column] : "-1"
      xCount += spot === "X" ? 1 : 0
    }
    if (xCount === 5) return true
  }
  return false
}

const checkForWin = (board: Board) => checkForVerticalWin(board) || checkForHorizontalWin(board)

export const markAllWinningBoards = (boards: Board[], spots: string[]) => {
  let markedBoards = [...boards]
  let boardsThatWon = []
  let lastWinningSpot = ""

  for (let i=0; i<spots.length; i++) {
    const spot = spots[i]

    for (let boardIndex=0; boardIndex<boards.length; boardIndex++) {
      const boardUnderTest = markedBoards[boardIndex]
      const board = markSpot(boardUnderTest, spot)
      markedBoards.splice(boardIndex, 1, board)
      const isWinner = checkForWin(board)
      if (isWinner) {
        boardsThatWon.push(board)
        lastWinningSpot = spot
        markedBoards.splice(boardIndex, 1, board.map(row => row.map(spot => "na")))
      }
    }
  }

  return {boardsThatWon, lastWinningSpot}
}

const calcSum = (board: Board, winningNumber: string) => {
  let sum = 0
  board.forEach(row => {
    row.forEach(spot => spot !== "X" ? sum += Number(spot) : ()=>{} )
  })
  return sum * Number(winningNumber)
}

export const getWinningBoards = (boards: Board[], numbers: string[]) => {
  const {boardsThatWon, lastWinningSpot} = markAllWinningBoards(boards, numbers)
  const winningBoard = boardsThatWon[boardsThatWon.length-1]
  return calcSum(winningBoard, lastWinningSpot)
}

console.log(getWinningBoards(boards, numbers));
