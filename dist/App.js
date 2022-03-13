/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2021-11-09 14:43:05
 * @LastEditTime: 2022-02-26 20:57:42
 * @LastEditors: Gavin
 */
import { createReactive as reactive, createRef as ref } from './core/ref.js';
import { h } from './core/h.js';
const App = {
    render(context) {
        //需要渲染的内容
        // const div =document.createElement('div')
        // div.innerText=context.state.count
        // div.onclick=context.btnClick
        // return div
        //虚拟dom编译
        return h('div', { id: 'adm', class: "admin" + context.state.count }, [h('h1', null, '我的天'), h('h3', null, '我的地'), h('h3', null, context.state.count), h('h4', null, context.isCheck.value), h('button', { 'click': context.btnClick }, "Click!")]);
    },
    setup(props) {
        const state = reactive({
            count: 0
        });
        const isCheck = ref(false);
        const btnClick = () => {
            console.log("点击");
            state.count++;
            isCheck.value = !isCheck.value;
        };
        return {
            state,
            isCheck,
            btnClick
        };
    }
};
export default App;
