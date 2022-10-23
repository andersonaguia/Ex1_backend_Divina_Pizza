import fs from 'fs'

export const readDataInFile = (fileName: 'solicitations.json' | 'pizzas.json') => {
    const data = JSON.parse(fs.readFileSync(fileName).toString())
    return data
}