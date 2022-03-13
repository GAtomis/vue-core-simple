/**
 * @description: 挂载真实DOM通过虚拟节点
 * @param {Vnode} vnode 虚拟节店
 * @param {HTMLElement} container 真实容器
 * @return {Vnode} vnode 虚拟节店
 * @Date: 2021-11-16 11:35:34
 */
export function mountElement(vnode, container) {
    const { tag, props, children } = vnode;
    //tag 创建标签类型
    const element = vnode.el = document.createElement(tag);
    //props 标签属性
    if (props) {
        const propsList = Object.entries(props);
        propsList.forEach(([key, value]) => {
            if (typeof value === 'function') {
                console.error(element);
                element === null || element === void 0 ? void 0 : element.addEventListener(key, value);
                // element?.[key]=value
            }
            else {
                element.setAttribute(key, value);
            }
        });
    }
    //children 子类标签
    if (typeof children != 'object') {
        const textNode = document.createTextNode(children);
        element.append(textNode);
    }
    else if (Array.isArray(children)) {
        children.forEach((v) => {
            mountElement(v, element);
            console.log("孩子节点", v);
        });
    }
    container.append(element);
    return vnode;
}
/**
 * @description: 虚拟节点
 * @param {Vnode} oldVnode 老的虚拟节点
 * @param {Vnode} newVnode 新的虚拟节店
 * @return {*}
 * @Date: 2021-11-15 16:13:30
 */
export function diff(oldVnode, newVnode) {
    var _a, _b;
    //tag
    if (oldVnode.tag != newVnode.tag) {
        //DOM操作
        (_a = oldVnode.el) === null || _a === void 0 ? void 0 : _a.replaceWith(newVnode.el = document.createElement(newVnode.tag));
    }
    else {
        console.log("tag相同");
        newVnode.el = oldVnode.el;
    }
    //目标节点
    let el = newVnode.el;
    //
    const { props: oldProps } = oldVnode;
    const { props: newProps } = newVnode;
    // 更改渲染
    if (oldProps && newProps) {
        //key为属性名
        Object.keys(newProps).forEach((key) => {
            var _a, _b;
            const oldVal = oldProps[key];
            const newVal = newProps[key];
            if (newVal !== oldVal) {
                if (typeof newVal === 'function') {
                    (_a = oldVnode.el) === null || _a === void 0 ? void 0 : _a.removeEventListener(key, oldVal);
                    (_b = oldVnode.el) === null || _b === void 0 ? void 0 : _b.addEventListener(key, newVal);
                }
                else {
                    console.log(oldVnode, key, newVal);
                    oldVnode.el.setAttribute(key, newVal);
                }
            }
        });
    }
    //移除渲染
    if (oldProps) {
        //key为属性名
        Object.keys(oldProps).forEach((key) => {
            var _a, _b;
            const oldVal = oldProps[key];
            const newVal = newProps[key];
            if (!newProps[key]) {
                if (typeof newVal === 'function') {
                    (_a = oldVnode.el) === null || _a === void 0 ? void 0 : _a.removeEventListener(key, oldVal);
                }
                else {
                    (_b = oldVnode.el) === null || _b === void 0 ? void 0 : _b.removeAttribute(key);
                }
            }
        });
    }
    //children处理
    const { children: newChildren } = newVnode;
    const { children: oldChildren } = oldVnode;
    console.error("newChildren", newChildren, typeof newChildren);
    console.error("oldChildren", oldChildren, typeof oldChildren);
    if (typeof newChildren === 'string') {
        //新节点为字符串类型的时候
        if (typeof oldChildren === 'string') {
            //新老节点都为string且互相不等于时可以正常替换 
            if (oldChildren != newChildren) {
                console.error(newChildren, oldChildren, el);
                el.textContent = newChildren;
            }
        }
        else if (Array.isArray(oldChildren)) {
            //老节点为数组
            el.textContent = newChildren;
        }
    }
    else if (Array.isArray(newChildren)) {
        //新节点为Array<Vnode>
        if (typeof oldChildren === 'string') {
            // 老节点为字符串
            el.innerText = ``;
            mountElement(newVnode, el);
        }
        else if (Array.isArray(oldChildren)) {
            const length = Math.min(newChildren.length, oldChildren.length);
            // 公共长度
            for (let index = 0; index < length; index++) {
                const nv = newChildren[index];
                const ov = oldChildren[index];
                diff(ov, nv);
            }
            //新节点有拓展子集时
            if (newChildren.length > length) {
                for (let index = length; index < newChildren.length; index++) {
                    const nv = newChildren[index];
                    mountElement(nv, el);
                }
            }
            //删除多余节点
            if (oldChildren.length > length) {
                for (let index = length; index < oldChildren.length; index++) {
                    const ov = oldChildren[index];
                    (_b = ov.el.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(ov.el);
                }
            }
        }
    }
}
