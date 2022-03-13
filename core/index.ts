/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2021-11-09 14:02:12
 * @LastEditTime: 2021-11-16 14:12:32
 * @LastEditors: Gavin
 */
import { createReactive, createRef, effectWatch } from './ref.js'
import { diff, mountElement } from './useRender.js'


export function createApp(rootComponent: any): any {
  return {
    mount(rootContainer: HTMLElement): void {
      const context = rootComponent.setup()
      let prevSubTree: any,
        isMounted = false
      //需要更新发布的操作
      effectWatch(() => {


        if (!isMounted) {
          //init
          isMounted = true
          //返回的数据驱动 
          rootContainer.innerHTML = ``
          // const element=rootComponent.render(context)

          //把组件加入到容器中
          // rootContainer.append(element)
          const subTree = rootComponent.render(context)
          prevSubTree = mountElement(subTree, rootContainer)
          console.log("已到节点函数",prevSubTree);
          

        }
        else {
          //局部
          //把组件加入到容器中
          // rootContainer.append(element)
          const subTree = rootComponent.render(context)
          console.log("渲染出来的 新vnode",subTree);
          console.log("渲染出来的 旧vnode",prevSubTree);

          console.error(prevSubTree, subTree);

          diff(prevSubTree, subTree)
          prevSubTree = subTree

        }


      })
    }
  }
}
