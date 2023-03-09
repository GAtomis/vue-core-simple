class APromise<T> {
    private state: "pending" | "fulfilled" | "rejected"
    private value: any
    private reason: any
    private onResolvedCallbacks: any[]
    private onRejectedCallbacks: any[]
    static PENDING: "pending" = "pending"
    static FULFILLED: "fulfilled" = "fulfilled"
    static REJECTED: "rejected" = "rejected"
    static resolvePromise=function(promise2:APromise<any>,x,resolve,reject){

    }
    constructor(executor) {
        this.initVal()
        // 如果executor执行报错，直接执行reject
        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            this.reject(err);
        }
    }
    //初始化绑定
    initVal(){
        // 初始化state为等待态
        this.state = APromise.PENDING;
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        this.onRejectedCallbacks=[]
        this.onResolvedCallbacks=[]
    }
    resolve =(value) =>{
        // state改变,resolve调用就会失败    

        if (this.state === APromise.PENDING) {
            // resolve调用后，state转化为成功态
            this.state = APromise.FULFILLED;
            // 储存成功的值
            this.value = value;
            this.onResolvedCallbacks.forEach(fn=>fn())

        }
    }
    reject = (reason)=> {
        // state改变,reject调用就会失败
        if (this.state === APromise.PENDING) {
            // reject调用后，state转化为失败态
            this.state = APromise.REJECTED;
            // 储存失败的原因
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn=>fn())
        }
    }

    then (onFulfilled, onRejected?) {
        if (onFulfilled && !this.isFunction(onFulfilled)) throw new Error("请传入正确的方法")
        if (onRejected && !this.isFunction(onRejected)) throw new Error("请传入正确的方法")
        //命中状态
        if (this.state == APromise.FULFILLED) {
            onFulfilled?.(this.value)
        }
        //拒绝状态
        if (this.state == APromise.REJECTED) {
            onRejected?.(this.reason)
        }
        if (this.state==APromise.PENDING){
            console.log(this.onResolvedCallbacks);
            
            this.onResolvedCallbacks.push(()=>onFulfilled(this.value))
            // this.onRejectedCallbacks.push(onRejected)
        }
    }
    private isFunction(val: any) {
        if (!val) throw new Error("请输入参数")
        return typeof val == "function"


    }



}


new APromise((resolve, reject) => {

    setTimeout(() => {
        resolve(1)
    },1000)

}).then(res => {
    console.log(res);

    return 1+res

}).then()