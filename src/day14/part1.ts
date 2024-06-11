import * as fs from 'fs'
const inputArray: string[] = fs.readFileSync('./src/day14/input.txt', 'utf8').split("\n")

export interface Rule {
  adjacent: string
  insert: string
  index: number
}
export interface RuleC {
  adjacent: string
  insert: string
  pairCount: {
    pair: string,
    count: number
  }[]
}
export interface Pair {
  [pair: string]: number
}


export const parseInput = (input: string[]) => {
  const template = input[0]
  const rules = input.slice(2).map(rule => {
    const splitRules = rule.split(" -> ")
    return {
      adjacent: splitRules[0],
      insert: splitRules[1]
    } as Rule
  })
  return {template, rules}
}

export const indexEachOccurance = (template: string, rules: Rule[]) => {
  // find the index of the template where the rule finds a hit
  const hits: Rule[] = []
  const templateChars = template.split("")
  for (let i=0; i<templateChars.length-1; i++) {
    const current = templateChars[i]
    const next = templateChars[i+1]
    const combined = `${current}${next}`
    
    rules.forEach(rule => {
      if (combined === rule.adjacent) {
        hits.push({
          ...rule,
          index: i + 1
        })
      }
    })
  }
  return hits
}

export const processRules = (template: string, rules: Rule[]) => {
  let result = template

  const indexedRules = indexEachOccurance(template, rules)
  
  for (let i = 0; i < indexedRules.length; i++) {
    const index = indexedRules[i].index
    if (index > 0) {
      // insert into polymer
      const splitTemplate = result.split("")
      splitTemplate.splice(index , 0, indexedRules[i].insert)
      result = splitTemplate.join("")
      
      // adjust indexes to correct location
      indexedRules.forEach(rule => {
        rule.index += rule.index >= index ? 1 : 0
      })
    }
  }
  return result
}

export const countOccurance = (template: string, rules: Rule[]) => {
  let result = template
  let pairCount: Pair = {}
  let indexedRules = indexEachOccurance(template, rules)
  indexedRules.forEach(r => {
    pairCount[r.adjacent] = 0
  })
  // let temp: Pair = {}
  // Object.values(pairCount).forEach(pair => {
  //   if (temp[pair.pair])
  // })

  const templateChars = template.split("")
  for (let i=0; i<templateChars.length-1; i++) {
    const current = templateChars[i]
    const next = templateChars[i+1]
    const combined = `${current}${next}`
    if (pairCount[combined] >= 0) {
      pairCount[combined]++
    } else {
      pairCount[combined] = 1
    }
    const insertChar = indexedRules.find(rule => rule.adjacent = combined)?.insert ?? ""
    if (pairCount[`${current}${insertChar}`] >= 0) {
      pairCount[`${current}${insertChar}`] ++
    } else {
      pairCount[`${current}${insertChar}`] = 1
    }
    if (pairCount[`${insertChar}${next}`] >= 0) {
      pairCount[`${insertChar}${next}`]++
    } else {
      pairCount[`${insertChar}${next}`] = 1
    }
  }
  return pairCount
}

export const repeatProcess = (count: number, template: string, rules: Rule[]) => {
  let myTemplate = template

  for (let i=0; i<count; i++) {
    myTemplate = processRules(myTemplate, rules)
  }

  return myTemplate
}

export const getCommonElements = (template: string) => {
  const unique = template.split("").filter((c, index, self) => 
    index === self.findIndex(cc => cc === c)
  )

  const counts = unique.map(uniq => {
    const sum = template.split("").reduce((sum, char) => {
      return sum + (uniq === char ? 1 : 0)
    }, 0)
    return {char: uniq, sum}
  })

  return {
    most: counts.reduce((p, c) => p.sum > c.sum ? p : c).sum, 
    least: counts.reduce((p, c) => p.sum < c.sum ? p : c).sum, 
  }
}

const part1 = (input: string[]) => {
  const {template, rules} = parseInput(input)
  const polymer = repeatProcess(10, template, rules)
  const common = getCommonElements(polymer)
  console.log(common.most - common.least)
}

const part2 = (input: string[]) => {
  const {template, rules} = parseInput(input)
  let pairCount: Pair = {}
  for (let i=0; i<10; i++) {
    pairCount = countOccurance(template, rules)
  }

  return pairCount
}