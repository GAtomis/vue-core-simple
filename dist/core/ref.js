/*
 * @Description: vue3核心
 * @Author: Gavin
 * @Date: 2021-11-05 10:44:43
 * @LastEditTime: 2022-02-26 21:05:49
 * @LastEditors: Gavin
 */
let currentEffects;
class Dep {
    constructor(val) {
        this._val = val;
        this.effects = new Set();
    }
    get value() {
        this.depend();
        return this._val;
    }
    set value(newVal) {
        this._val = newVal;
        console.log(this._val);
        this.notice();
    }
    //收集依赖
    depend() {
        if (currentEffects) {
            //进入集合
            this.effects.add(currentEffects);
        }
    }
    //触发依赖
    notice() {
        this.effects.forEach((effect) => {
            effect();
        });
    }
}
// const dep = createRef<number>(10);
export function effectWatch(effect) {
    currentEffects = effect;
    effect();
    // dep.depend()
    currentEffects = null;
}
//ref导出
export function createRef(params) {
    return new Dep(params);
}
const targetMap = new Map();
function getDep(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Dep();
        depsMap.set(key, dep);
    }
    return dep;
}
//Reactive导出
export function createReactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            console.log("get捕获阶段", target, key);
            const dep = getDep(target, key);
            dep.depend();
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            const dep = getDep(target, key);
            const result = Reflect.set(target, key, value);
            dep.notice();
            return result;
        }
    });
}
// let af
// const b = createReactive({ name: '张三' })
// effectWatch(() => {
//   af = '我叫'+b.name;
//   // console.log(targetMap);
//   // console.log(af);
// })
// // b.name = "周楠"
// const ref=createRef<boolean>(false)
