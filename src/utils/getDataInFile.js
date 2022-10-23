import fs from 'fs'

export const getDataInFile = (fileName) => {
    const data = JSON.parse(fs.readFileSync(fileName).toString())
    return data
}