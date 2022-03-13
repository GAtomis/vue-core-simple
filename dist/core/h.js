/*
 * @Description: vnode
 * @Author: Gavin
 * @Date: 2021-11-09 16:14:21
 * @LastEditTime: 2022-02-26 10:32:48
 * @LastEditors: Gavin
 */
export function h(tag, props, children) {
    return { tag, props, children: conversionType(children) };
}
function conversionType(children) {
    if (Array.isArray(children))
        return children;
    return children.toString();
}
