/*
 * @Description: vue3核心 
 * @Author: Gavin
 * @Date: 2021-11-05 10:44:43
 * @LastEditTime: 2023-02-03 13:58:14
 * @LastEditors: GAtomis
 */

// Ref接口

type fuc = () => void
interface Ref {
  effects?: any
  _val: any
  depend: () => void
  notice: () => void
}
let currentEffects: any
class Dep<T=any> implements Ref {
  _val:T|undefined
  effects:Set<unknown>
  constructor(val?: T|undefined) {
    this._val = val
    this.effects = new Set()
  }
  get value() {
    this.depend()
    return this._val
  }
  set value(newVal) {

    this._val = newVal
    console.log(this._val,newVal);
    
    this.notice()

  }
  //收集依赖 
  depend() {
    if (currentEffects) {
      //进入集合
      this.effects.add(currentEffects)
    }
  }
  //触发依赖
  notice() {
    this.effects.forEach((effect: any) => {
      effect()
    });
  }
}
// const dep = createRef<number>(10);
 export function effectWatch(effect: () => void) {
  currentEffects = effect
  effect()
  // dep.depend()
  currentEffects = null
}

//ref导出
export function createRef<T>(params: T):Dep<T> {
  return new Dep<T>(params)

}



export const targetMap = new Map()

function getDep(target: any, key: string): Ref {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep as Ref

}
//Reactive导出
export function createReactive(raw: any):any {
  return new Proxy(raw, {
    get(target, key) {
      console.log("get捕获阶段",target,key);
      
      const dep = getDep(target, key as string)
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key as string)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }


  })



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
