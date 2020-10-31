const fp = require('lodash')
const { Maybe, Container } = require('./support')

let maybe = Maybe.of([5, 6, 1])

let ex1 = () => {
    const res = maybe.map(value => {
        fp.flowRight(fp.add,fp.map(val=>val))(value)
    })
    console.log(res)
}
ex1()