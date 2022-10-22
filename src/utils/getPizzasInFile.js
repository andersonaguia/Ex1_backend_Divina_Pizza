import fs from 'fs'

export const getPizzasInFile = () => {
    const pizzas = JSON.parse(fs.readFileSync('pizzas.json').toString())
    return pizzas
}