import * as fs from 'fs'

const inputArray: string[] = fs.readFileSync('./src/day8/input.txt', 'utf8').split("\n")
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe

const digits = [
  ["a","b","c","e","f","g"],      // 0  6
  ["c","f"],                      // 1 *2
  ["a","c","d","e","g"],          // 2  5
  ["a","c","d","f","g"],          // 3  5
  ["b","c","d","f"],              // 4 *4
  ["a","b","d","f","g"],          // 5  5
  ["a","b","d","e","f","g"],      // 6  6
  ["a","c","f"],                  // 7 *3
  ["a","b","c","d","e","f","g"],  // 8 *7
  ["a","b","c","d","f","g"],      // 9  6
]

  /*
    2, 3, 5 
    2,3: adgc(e+f)
    2,5: adg(ce+bf)
    3,5: adfg(b+c)
    &&1
    AND(2, 1) = c
    AND(3, 1) = cf  unique
    AND(5, 1) = f
    &&4
    AND(2, 4) = cd  unique
    AND(3, 4) = cdf 
    AND(5, 4) = bdf unique

    0, 6, 9
    0,6: abefg(c+d)
    0,9: abcfg(d+e)
    6,9: abdfg(c+e)
    &&1
    AND(0, 1) = cf
    AND(6, 1) = f
    AND(9 ,1) = cf
    &&4
    AND(0, 4) = bcf
    AND(6, 4) = bdf
    AND(9, 4) = bcdf

  */

export const parseReadings = (input: string[]) => {
  return input.map(line => {
    const [displayInput, displayOutput] = line.split(" | ")
    return {in: displayInput, out: displayOutput}
  })
}

export const arrayAND = (a: string, b: string[]) => {
  let count = 0
  a.split("").forEach(aLetter => {
    count += b.includes(aLetter) ? 1 : 0
  })
  return count
}

export const figureOutOneAndFour = (readings: string[]) => {
  const one = readings.filter(reading => reading.length === 2)[0]
  const four = readings.filter(reading => reading.length === 4)[0]
  return [
    one.split(""),
    four.split("")
  ]
}

export const getOutPutReading = (input: {in: string, out: string}) => {
  const readings = input["in"].split(" ")
  const outPutReadings = input["out"].split(" ")
  const [one, four] = figureOutOneAndFour(readings)

  const output = outPutReadings.map(reading => {
    const andOne = arrayAND(reading, one)
    const andFour = arrayAND(reading, four)
    let segment = -1
    
    switch (reading.length) {
      case 2:
        segment = 1
        break;
      case 3:
        segment = 7
        break;
      case 4:
        segment = 4
        break;
      case 7:
        segment = 8
        break;
      case 5: 
        // 2, 3, or 5
        if (andOne == 2) {
          segment = 3
        } else {
          // 2 or 5
          if (andFour == 2) {
            segment = 2
          } else {
            segment = 5
          }
        }
          break;
      case 6: 
        // 0, 6, or 9
        if (andOne == 1) {
          segment = 6
        } else {
          // 0 or 9
          if (andFour == 3) {
            segment = 0
          } else {
            segment = 9
          }
        }
        break;
      default:
      break;
    }
    return segment
  })

  return Number(output.join(""))
}

export const figureOutTheRest = (input: string[]) => {
  const readings = parseReadings(input)
  return readings.reduce((prev, curr) => {
    return getOutPutReading(curr) + prev
  }, 0)
  
}

console.log(figureOutTheRest(inputArray));
