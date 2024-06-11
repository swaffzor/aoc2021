import * as fs from 'fs'

const inputArray: string = fs.readFileSync('./src/day16/input.txt', 'utf8')


export const getTypeAndVersion = (input: string) => {
  const bits = input.split("")
  const packetVersion = bitArrayToInt(bits.slice(0, 3))
  const typeID = bitArrayToInt(bits.slice(3, 6))
  return {packetVersion, typeID}
}

export const bitArrayToInt = (input: string[]) => {
  // return bitsToInt(input.join(""))
  return parseInt(input.join(""), 2)
}


export const packetMain = (input: string) => {
  const packetVersions: number[] = []
  const {packetVersion, typeID} = getTypeAndVersion(input)
  
  packetVersions.push(packetVersion)
  const bits = input.split("").slice(6)

  switch (typeID) {
    case 4:
      // literal value
      [...handleLiteralValue(bits)]
      break;
    case 3:
    case 6:
    default:
      // operator type
      const versions = handleOperatorType(bits)
      packetVersions.push(...versions)
      break;
  }
  return packetVersions
}

export const handleLiteralValue = (bits: string[]) => {
  let isLastPacket = bits[0] === "0"
  let loop = 0
  let value: string[] = []
  let end = 0
  
  do {
    const start = 1 + loop * 5
    end = 5 + loop * 5
    const valuePartial = bits.slice(start, end)
    value.push(...valuePartial)
    isLastPacket = bits[loop * 5] === "0"
    loop++
  } while (!isLastPacket) 

  return [bitArrayToInt(value), end] // returns [integerValue, positionInBits]
}

export const handleOperatorType = (bits: string[]) => {
  const packetValues: number[] = []
  const versions: number[] = []
  let offset = 0

  const lengthOfBits = bits[0] === "1" ? 11 : 15
  const length = bitArrayToInt(bits.slice(1, lengthOfBits+1))
  
  if (lengthOfBits === 15) {
    
    while(offset < length) {
      const subpacket = bits.slice(1+lengthOfBits, 1+lengthOfBits+length)
      const {packetVersion} = getTypeAndVersion(subpacket.join(""))
      versions.push(packetVersion)
      offset += 6
      
      const [packetValue, position] = handleLiteralValue(subpacket.slice(offset))
      packetValues.push(packetValue)
      offset += position
    }
    
  } else {
    for (let i=0; i<length; i++) {
      const subpacket = bits.slice(1+lengthOfBits*i, 1+lengthOfBits*i+lengthOfBits)
      const {packetVersion} = getTypeAndVersion(subpacket.join(""))
      versions.push(packetVersion)
      packetValues.push(bitArrayToInt(subpacket))
    }
  }
  
  return versions
}

export const getAllLiterals = () => {
  
}
