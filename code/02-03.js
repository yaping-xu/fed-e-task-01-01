const fp = require('lodash/fp')
const cars = require('./cars')
let _average = function(xs){
    return fp.reduce(fp.add,0,xs) / xs.length
}

const averageDollarValue = fp.flowRight(_average,fp.map(car => car.dollar_value))
console.log(averageDollarValue(cars))