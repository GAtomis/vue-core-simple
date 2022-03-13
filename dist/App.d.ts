import { Vnode } from './core/h.js';
declare const App: {
    render(context: any): Vnode;
    setup(): {
        state: any;
        btnClick: () => void;
    };
};
export default App;
