const fp = require('lodash/fp')
const cars = require('./cars')

const _underscore = fp.replace(/\W+/g,'_')

const sanitizeNames = fp.map(fp.flowRight(_underscore,fp.lowerCase,car=>car.name))

console.log(sanitizeNames(cars))
