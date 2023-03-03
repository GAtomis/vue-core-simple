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
        var _this = this;
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        }
        ;
        if (this.state === 'rejected') {
            onRejected(this.reason);
        }
        ;
        // 当状态state为pending时
        if (this.state === 'pending') {
            // onFulfilled传入到成功数组
            this.onResolvedCallbacks.push(function () {
                onFulfilled(_this.value);
            });
            // onRejected传入到失败数组
            this.onRejectedCallbacks.push(function () {
                onRejected(_this.reason);
            });
        }
    };
    return APromise;
}());
new APromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    });
});
