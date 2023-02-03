interface Ref {
    effects?: any;
    _val: any;
    depend: () => void;
    notice: () => void;
}
declare class Dep<T = any> implements Ref {
    _val: T | undefined;
    effects: Set<unknown>;
    constructor(val?: T | undefined);
    get value(): T | undefined;
    set value(newVal: T | undefined);
    depend(): void;
    notice(): void;
}
export declare function effectWatch(effect: () => void): void;
export declare function createRef<T>(params: T): Dep<T>;
export declare const targetMap: Map<any, any>;
export declare function createReactive(raw: any): any;
export {};
