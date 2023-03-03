var APromise = /** @class */ (function () {
    function APromise(executor) {
        // 初始化state为等待态
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        // 如果executor执行报错，直接执行reject
        try {
            executor(this.resolve, this.reject);
        }
        catch (err) {
            this.reject(err);
        }
    }
    APromise.prototype.resolve = function (value) {
        // state改变,resolve调用就会失败
        if (this.state === 'pending') {
            // resolve调用后，state转化为成功态
            this.state = 'fulfilled';
            // 储存成功的值
            this.value = value;
        }
    };
    ;
    APromise.prototype.reject = function (reason) {
        // state改变,reject调用就会失败
        if (this.state === 'pending') {
            // reject调用后，state转化为失败态
            this.state = 'rejected';
            // 储存失败的原因
            this.reason = reason;
        }
    };
    APromise.prototype.then = function (onFulfilled, onRejected) {
        if (this.isFunction(onFulfilled)) {
        }
        else {
            new Error("请传入正确的方法");
        }
        if (this.isFunction(onRejected)) {
        }
    };
    APromise.prototype.isFunction = function (val) {
        if (!val)
            new Error("请输入参数");
        return typeof val == "function";
    };
    return APromise;
}());
new APromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    });
});
