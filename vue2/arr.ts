/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-02-03 11:35:10
 * @LastEditors: GAtomis
 * @LastEditTime: 2023-02-03 12:43:48
 * @Description: 头部注释
 */

//获取原来的数组原型属性
let oldArrayProtoMethods = Array.prototype

//继承

export let ArrayMethods = Object.create(oldArrayProtoMethods)

//劫持
let methods = ["push", "pop", "unshift", "shift", "splice"]

methods.forEach(item => {
    ArrayMethods[item] = function (...args) {
        // 释放依赖
        let res = oldArrayProtoMethods[item].apply(this, args)
        let inserted
        //数组追加对象的情况
        switch (item) {
            case "push":
            case "unshift":
                inserted=args
                break;
            case "splice":
            
                inserted=args.splice(2)//=={a:1}  arr.splice(0,1,{a:1})
                break 
        }
        let ob = this.__ob__
        return res
    }
})