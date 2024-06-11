import * as fs from 'fs'
import { Grid } from '../day11/part1'
import { getPointNeighbors } from '../day11/part1-attempt1'
const inputArray: Grid = fs.readFileSync('./src/day15/input.txt', 'utf8').split("\n").map(row => row.split("").map(spot => Number(spot)))

interface Route {
  x: number,
  y: number,
  risk: number, 
  path: {x: number, y: number}[]
}

interface TableEntry {
  vertex: string,
  distance: number,
  previous: string,
  visited: boolean,
  risk: number
}

export const deeJay = (grid: Grid) => {
  const visited: string[] = []
  const temp = grid.map((row, y) => row.map((point, x) => {
    return {
      vertex: `${x},${y}`,
      risk: point
    }
  })).flat()
  const unVisited: string[] = temp.map(uv => uv.vertex)
  const table: TableEntry[] = temp.map((uv, index) => {
    return{
      vertex: uv.vertex,
      distance: index === 0 ? 0 : 999999,
      previous: "",
      visited: index === 0 ? true : false,
      risk: uv.risk
    }
  })

  let initialRun = true
  while (unVisited.length > 0) {
    let currentVertex = initialRun ? table[0] : table
      .filter((point, index) => !point.visited)
      .reduce((p, c, cIndex, self) => {
        return  p.vertex === "0,0" || p.distance - c.distance < 0 ? p : c
      })

    const [curx, cury] = currentVertex.vertex.split(",").map(n => Number(n))
    const neighbors = getPointNeighbors({x: curx, y: cury, v: grid[cury][curx]}, grid, false)
    .map(point => {
      const tableEntry = table.find(te => te.vertex === `${point.x},${point.y}`)
      return {
        vertex: `${point.x},${point.y}`,
        distance: tableEntry?.distance,
        previous: "",
        visited: visited.some(v => v === `${point.x},${point.y}`),
        risk: tableEntry?.risk
      } as TableEntry
    })
    .filter(point => !point.visited)

    neighbors.forEach(neighbor => {
      const index = table.findIndex(entry => entry.vertex === neighbor.vertex)
      const tableEntry = table[index]
      const distance = currentVertex.distance + tableEntry.risk
      if (distance < tableEntry.distance) {
        tableEntry.distance = distance
        tableEntry.previous = currentVertex.vertex
      }
    })
    currentVertex.visited = true // put back in table?
    unVisited.splice(unVisited.findIndex(fi => fi === currentVertex.vertex), 1)
    visited.push(currentVertex.vertex)
    initialRun = false
    
  }
  return table[table.length-1].distance
}
console.log(deeJay(inputArray))

/*
Let distance of start vertex from start vertex = 0
Let distance of all other vertices from start = ∞ (infinity)
WHILE vertices remain unvisited
  Visit unvisited vertex with smallest known distance from start vertex (call this 'current vertex')
  FOR each unvisited neighbour of the current vertex
    Calculate the distance from start vertex
    If the calculated distance of this vertex is less than the known distance
      Update shortest distance to this vertex
      Update the previous vertex with the current vertex
    end if
  NEXT unvisited neighbour
  Add the current vertex o the list of visited vertices
END WHILE
*/

/*
const expected = [
    1,1,6,3,7,5,1,7,4,2,
    2,2,7,4,8,6,2,8,5,3,
    3,3,8,5,9,7,3,9,6,4,
    4,4,9,6,1,8,4,1,7,5,
    5,5,1,7,2,9,5,2,8,6
  ]
*/
export const expandGrid = (grid: Grid) => {
  let newGrid: Grid =[]
  let newRow: number[] = []

  for (let i=0; i<10; i++) {
    for (let j=0; j<5; j++) {
      let row = [...grid[i]]
      const temp = row.map(s => {
        return s + j > 9 ? s + j - 9 : s + j
      })
      newRow.push(...temp)
    }
    newGrid.push(newRow)
    newRow = []
  }
  
  // for (let i=0; i<4; i++) {
  //   for (let j=0; j<5; j++) {
  //     let row = [...newRow]
  //     const temp = row.map(s => {
  //       return s + j > 9 ? s + j - 9 : s + j
  //     })
  //     newGrid.push(temp)
  //   }
    
  // }
  return {newRow, newGrid}
}