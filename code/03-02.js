const fp = require('lodash')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])

let ex2 = ()=> {
    const res = xs.map(value => fp.first(value))
    console.log(res._value)
}
ex2()