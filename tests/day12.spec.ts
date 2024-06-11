import { aFunc, getNextOptions, mapConnections } from "../src/day12/part1"

const input = [
  "start-A",
  "start-b",
  "A-c",
  "A-b",
  "b-d",
  "A-end",
  "b-end",
]

test("", () => {
  const connections = mapConnections(input)
  aFunc(connections)
})