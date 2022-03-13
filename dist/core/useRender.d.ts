import { Vnode } from './h.js';
/**
 * @description: 挂载真实DOM通过虚拟节点
 * @param {Vnode} vnode 虚拟节店
 * @param {HTMLElement} container 真实容器
 * @return {Vnode} vnode 虚拟节店
 * @Date: 2021-11-16 11:35:34
 */
export declare function mountElement(vnode: Vnode, container: HTMLElement): Vnode;
/**
 * @description: 虚拟节点
 * @param {Vnode} oldVnode 老的虚拟节点
 * @param {Vnode} newVnode 新的虚拟节店
 * @return {*}
 * @Date: 2021-11-15 16:13:30
 */
export declare function diff(oldVnode: Vnode, newVnode: Vnode): void;
