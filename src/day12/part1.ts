import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day12/input.txt', 'utf8').split("\n")

interface Connection {
  [key: string]: string[]
}

export const mapConnections = (input: string[]) => {
  const connections: Connection = {}
  
  input.forEach(line => {
    const caves = line.split("-")

    if (!connections[caves[0]]) {
      connections[caves[0]] = [caves[1]]
    } else {
      connections[caves[0]].push(caves[1])
    }
    if (!connections[caves[1]]) {
      connections[caves[1]] = [caves[0]]
    } else {
      connections[caves[1]].push(caves[0])
    }
  })

  return connections
}

export const getNextOptions = (position: string, connections: Connection) => {
  return connections[position]
}

export const bFUnc = (from: string, connections: Connection) => {
  if (from === "end") {
    return 1
  }
  const options = getNextOptions(from, connections)
  options.forEach(option => {
    const result = bFUnc(option, connections)
  })
}

export const aFunc = (connections: Connection) => {
  Object.keys(connections).forEach(connection => {
    const next = getNextOptions(connection, connections)
    const idk = bFUnc(next[0], connections)
  })
}

// func for iterating through paths