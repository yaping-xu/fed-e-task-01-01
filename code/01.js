const a = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(`hello`)
    },10)
})

const b = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(`lagou`)
    },10)
})

const c = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(`I ❤ U`)
    },10)
})


Promise.all([a,b,c]).then(result=>{
    console.log(result.join(' '))
})
