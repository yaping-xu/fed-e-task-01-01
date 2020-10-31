const fp = require('lodash/fp')
const cars = require('./cars')

const isFirstName = fp.flowRight(fp.prop('name'),fp.first)
console.log(isFirstName(cars))