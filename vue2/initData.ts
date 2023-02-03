/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-02-03 11:21:33
 * @LastEditors: GAtomis
 * @LastEditTime: 2023-02-03 12:12:06
 * @Description: 头部注释
 */
import { observer } from "./observe"
function initData(vm:any){

    let data = vm.$options.data
    data= vm._data= typeof data === "function"?data.call(vm):data

    observer(data)


}