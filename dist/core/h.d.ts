export interface Vnode {
    tag: string;
    props: any;
    children: string | Array<Vnode>;
    el?: HTMLElement;
}
export declare function h(tag: string, props: any, children: string | number | boolean | Array<Vnode>): Vnode;
