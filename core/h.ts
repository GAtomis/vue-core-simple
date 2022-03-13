/*
 * @Description: vnode
 * @Author: Gavin
 * @Date: 2021-11-09 16:14:21
 * @LastEditTime: 2022-02-26 10:32:48
 * @LastEditors: Gavin
 */


export interface Vnode {
  tag: string, props: any, children: string|Array<Vnode>,el?:HTMLElement
}
export function h(tag:string, props: any, children: string|number|boolean|Array<Vnode>): Vnode {
  return {tag, props, children: conversionType(children)}
}
function conversionType(children:string|number|boolean|Array<Vnode>){
  if(Array.isArray(children)) return children;
  return children.toString()

}