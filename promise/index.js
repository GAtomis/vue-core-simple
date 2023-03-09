var APromise = /** @class */ (function () {
    function APromise(executor) {
        var _this = this;
        this.resolve = function (value) {
            // state改变,resolve调用就会失败    
            if (_this.state === APromise.PENDING) {
                // resolve调用后，state转化为成功态
                _this.state = APromise.FULFILLED;
                // 储存成功的值
                _this.value = value;
                _this.onResolvedCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        this.reject = function (reason) {
            // state改变,reject调用就会失败
            if (_this.state === APromise.PENDING) {
                // reject调用后，state转化为失败态
                _this.state = APromise.REJECTED;
                // 储存失败的原因
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        this.initVal();
        // 如果executor执行报错，直接执行reject
        try {
            executor(this.resolve, this.reject);
        }
        catch (err) {
            this.reject(err);
        }
    }
    //初始化绑定
    APromise.prototype.initVal = function () {
        // 初始化state为等待态
        this.state = APromise.PENDING;
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        this.onRejectedCallbacks = [];
        this.onResolvedCallbacks = [];
    };
    APromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        if (onFulfilled && !this.isFunction(onFulfilled))
            throw new Error("请传入正确的方法");
        if (onRejected && !this.isFunction(onRejected))
            throw new Error("请传入正确的方法");
        //命中状态
        if (this.state == APromise.FULFILLED) {
            onFulfilled === null || onFulfilled === void 0 ? void 0 : onFulfilled(this.value);
        }
        //拒绝状态
        if (this.state == APromise.REJECTED) {
            onRejected === null || onRejected === void 0 ? void 0 : onRejected(this.reason);
        }
        if (this.state == APromise.PENDING) {
            console.log(this.onResolvedCallbacks);
            this.onResolvedCallbacks.push(function () { return onFulfilled(_this.value); });
            // this.onRejectedCallbacks.push(onRejected)
        }
    };
    APromise.prototype.isFunction = function (val) {
        if (!val)
            throw new Error("请输入参数");
        return typeof val == "function";
    };
    APromise.PENDING = "pending";
    APromise.FULFILLED = "fulfilled";
    APromise.REJECTED = "rejected";
    APromise.resolvePromise = function (promise2, x, resolve, reject) {
    };
    return APromise;
}());
new APromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
}).then(function (res) {
    console.log(res);
    return 1 + res;
}).then();
