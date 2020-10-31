const fp = require('lodash')
const { Maybe, Container } = require('./support')

let ex4 = function (n) {
    if(n){
        return parseInt(n)
    }
}

let maybe = Maybe.of(undefined)
const res = maybe.map(value=>parseInt(value))
console.log(res._value)