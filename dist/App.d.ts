import { Vnode } from './core/h.js';
declare const App: {
    render(context: any): Vnode;
    setup(props: any): {
        state: any;
        isCheck: {
            _val: boolean | undefined;
            effects: Set<unknown>;
            value: boolean | undefined;
            depend(): void;
            notice(): void;
        };
        btnClick: () => void;
        arr: any;
    };
};
export default App;
