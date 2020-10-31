const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    // 因为原生Promise通过new来生成，所以肯定Promis是一个类，
    // 需要传递一个执行器函数立即执行,执行器函数传递两个参数,resolve成功回调和reject失败回调
    constructor(executor){
        try{
            executor(this.resolve,this.reject)
        }catch(e){
            this.reject(e)
        }
    }
    // 初始化状态为pending
    status = PENDING
    // 初始化resolve的返回的data
    value = undefined
    // 初始化失败的原因
    reason = undefined
    // 因为resolve和reject需要在执行器函数中执行，所以要写成箭头函数，让他的this指向当前的构造函数
    scuessCallback = []
    failCallback = []
    resolve = value =>{
        this.status = FULFILLED
        this.value = value
        // 当执行器结束，调用resolves时，再去顺序执行成功回调
        while(this.scuessCallback.length) this.scuessCallback.shift()()
    }
    reject = reason =>{
        this.reject = REJECTED
        this.reason = reason
        while(this.failCallback.length) this.failCallback.shift()()
    }
    // then方法接收两个参数，判断Promise的执行状态，fulfilled就执行scuessCallback,rejected执行failCallbak
    then(scuessCallback,failCallback){
        // 在then函数中加入scuessCallback和failCallback的默认值
        scuessCallback ? scuessCallback: value => value
        failCallback ? failCallback: reason => { throw reason }

        // 因为then需要返回一个promise对象，创建promise2然后返回
       const promise2 = new MyPromise((resolve,reject)=>{
            if(this.status === FULFILLED){
                // 内部有对promise2的调用，所以把函数放在宏任务里面，等最后执行
                try{
                    setTimeout(()=>{
                        const x = scuessCallback(this.value)
                        // 成功回调的返回值可能是普通值可能是promise对象，用下面的函数进行判断
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                }catch(e){
                    reject(e)
                }
            }else if(this.status === REJECTED){
                try{
                    setTimeout(()=>{
                        const x = failCallback(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                }catch(e){
                    reject(e)
                }
            }else{
                // 如果是pending状态，证明执行器函数还在执行中，把异步调用存储起来
                this.scuessCallback.push(()=>{
                    try{
                        setTimeout(()=>{
                            const x = scuessCallback(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        },0)
                    }catch(e){
                        reject(e)
                    }
                })
                this.failCallback.push(()=>{
                    setTimeout(()=>{
                      try{
                        const x =  failCallback(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                      }catch(e){
                         reject(e)
                      }
                    },0)
                })
            }
       })
       return promise2
    }
    // finally实现
    finally(callback){
        return this.then(value => {
            return MyPromise.resolve(callback()).then(value => value)
        }, reason => {
            return MyPromise.resolve(callback()).then(reason => {throw reason})
        })
    }
    //catch的实现
    catch( failCallback) {
        return this.then(undefined,failCallback)
    }
    // promise all 的实现 ，在myPromise里面加上静态方法all
   static all(array){
        const result = []
        const index = 0
        return new Promise((resolve,reject)=>{
            function addData(key,value) {
                result[key] = value
                index++
                if(index === array.length){
                    resolve(result)
                }
            }
            for(let i =0 ;i <= array.length ; i++){
                if(array[i] instanceof MyPromise){
                    array[i].then(value => addData(i,value), reason => reject(reason))
                    // array[i]是promis对象
                }else{ 
                    addData(i,array[i])
                    // array[i] 是普通对象
                }
                
            }
        })
    }
    // resolve的实现
    static resolve(value){
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
}

function resolvePromise(promise2,x,resolve,reject) {
    // 当前then的回调方法不能返回上一个then方法返回的promise对象，所以判断promise2是不是上一个then返回的Promise对象，如果是就报错
    if(promise2 === x){
        return reject(new TyppeError('Chaing cycle detected for promise # <Promise>'))
    }
    // 判断x是普通值还是Promise对象
    if(x instanceof MyPromise){
        // x是Promise对象
        x.then(resolve,reject)
    }else{
        // x是普通值，直接执行resolve
        resolve(x)
    }
    
}