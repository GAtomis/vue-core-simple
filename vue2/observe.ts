/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-02-03 11:04:31
 * @LastEditors: GAtomis
 * @LastEditTime: 2023-02-03 14:40:26
 * @Description: 监听属性
 */

import { ArrayMethods } from "./arr"




/**
 * @description: 监听属性
 * @param {*} data 挂载vm实例上的属性
 * @return {*}
 */
export function observer(data) {
    Object.defineProperty(data,"__data__",{
        enumerable:true,
        value:this
    })
    
    //1判断
    if (typeof data != 'object' || data == null) return data
    return new Observer(data)
}

/**
 * @description: 监听者
 * @return {*}
 */
class Observer { 
    constructor(data: any) {

        if(Array.isArray(data)){
            data.__proto__=ArrayMethods
            
            this.observeArray(data)
        }else{
            this.walk(data)
        }
 
    }
    walk(data) {
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i], data[i])

        }

    }
    observeArray(arr:any[]){
        for(let i= 0 ; i<arr.length;i++){
            observer(arr[i])

        }
    }



}

/**
 * @description: 依赖收集和释放
 * @param {any} data 挂载实例
 * @param {string} key 键名
 * @param {any} value   值
 * @return {*}
 */
function defineReactive(data: any, key: string, value: any) {
    //深度监听所有属性是否绑定响应式
    observer(value)
    Object.defineProperty(data,key,{
        get() {
            console.log("收集依赖");
            return value
        },
        set(newVal) {
            if(newVal=value) return ;
            console.log("发布依赖");
            //当新数据为对象时讲新数据重新进行响应式绑定
            observer(newVal)
            value=newVal

        }
    })


}