






function Vue (option:any){



}
function initMixin(Vue){

    Vue.prototype._init=function(option:any){
        let vm =this
        vm.$options=option
        //初始化状态
        initState(vm)

    }
}