const fp = require('lodash')
const { Maybe, Container } = require('./support')

let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x])
})
let user = {id:1,name:'Albert'}
let ex3 = () => {
   const res = fp.flowRight(fp.first)(safeProp('name',user)._value)
   console.log(res);
}
ex3()