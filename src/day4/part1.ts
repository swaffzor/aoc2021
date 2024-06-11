import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day4/input.txt', 'utf8').split("\n\n")


export type Row = string[]
export type Board = Row[]

const numbers = inputArray[0].split(",")
const boards = inputArray.slice(1).map(board => {
  return board.split('\n').map(row => row.split(/[ ]+/))
})

export const markSpot = (board: Board, numberCalled: string) => {
  return board.map(row => {
    const index = row.findIndex(spot => spot === numberCalled)
    const rowCopy = [...row]
    if (index >= 0) {
      rowCopy.splice(index, 1, "X")
    }
    return rowCopy
  })
}

export const checkForHorizontalWin = (board: Board) => {
    for (let index = 0; index < board.length; index++) {
      const filtered = board[index].filter(spot => spot === "X")
      if (filtered.length === 5) {
        return true
      }
    }
  return false
}

export const checkForVerticalWin = (board: Board) => {
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

export const checkForWin = (board: Board) => checkForVerticalWin(board) || checkForHorizontalWin(board)

export const markBoard = (board: Board, spots: string[], loopsToDo: number = spots.length) => {
  let markedBoard = [...board]
  let upperBounds = loopsToDo < spots.length ? loopsToDo : spots.length
  for (let i=0; i<upperBounds; i++) {
    const spot = spots[i]
    markedBoard = markSpot(markedBoard, spot)
    const isWinner = checkForWin(markedBoard)
    if (isWinner) {
      return {board: markedBoard, didWin: i}
    }
  }
  
  return {board: markedBoard, didWin: 0}
}

export const markAllBoards = (boards: Board[], spots: string[]) => {
  let markedBoards = [...boards]
  let numWins = 0

  for (let i=0; i<spots.length; i++) {
    const spot = spots[i]
    if (numWins > 0) return {markedBoards, lastNumber: spots[i-1]}

    for (let boardIndex=0; boardIndex<boards.length; boardIndex++) {
      const boardUnderTest = markedBoards[boardIndex]
      const board = markSpot(boardUnderTest, spot)
      markedBoards.splice(boardIndex, 1, board)
      numWins += checkForWin(board) ? 1 : 0
    }
  }

  return {markedBoards, lastNumber: "-1"}
}

export const calcSum = (board: Board, winningNumber: string) => {
  let sum = 0
  board.forEach(row => {
    row.forEach(spot => spot !== "X" ? sum += Number(spot) : ()=>{} )
  })
  return sum * Number(winningNumber)
}

export const getWinningScore = (boards: Board[], numbers: string[]) => {
  const {markedBoards, lastNumber} = markAllBoards(boards, numbers)
  const winningBoard = markedBoards.filter(board => checkForWin(board))
  return calcSum(winningBoard[0], lastNumber)
}

console.log(getWinningScore(boards, numbers));
