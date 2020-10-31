const fp = require('lodash/fp')
const cars = require('./cars')

const isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)

console.log(isLastInStock(cars))