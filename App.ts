/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2021-11-09 14:43:05
 * @LastEditTime: 2023-02-03 13:57:43
 * @LastEditors: GAtomis
 */
import { createReactive as reactive, createRef as ref,targetMap } from './core/ref.js'
import { h, Vnode } from './core/h.js'

const App = {
  render(context: any): Vnode {
    //需要渲染的内容
    // const div =document.createElement('div')
    // div.innerText=context.state.count
    // div.onclick=context.btnClick
    // return div
    //虚拟dom编译
    return h('div', { id: 'adm', class: "admin" + context.state.count }, [
      h('h1', null, '我的天'),
      h('h3', null, '我的地'), 
      h('h3', null, context.state.count),
      h('h4', null, context.isCheck.value),
      h('button', { 'click': context.btnClick }, "Click!"),
      ...context.arr.map((item:number)=>{
        return  h('h3', null, item)
      })
    ])
  },
  setup(props: any) {
    const state = reactive({
      count: 0
    })
    const isCheck = ref<boolean>(false)
    const arr =reactive([1,2,3])
    const btnClick = () => {
      // state.count++
      // isCheck.value = !isCheck.value
      arr.push(6)
      console.log(targetMap);
      
    }
    return {
      state,
      isCheck,
      btnClick,
      arr
    }

  }
}
export default App