import type Context from '../Context';
export default class Search {
    private globalSearch;
    private triggerMainChange;
    constructor(context: Context);
    set(value: string, scope?: string[]): void;
    remove(): void;
}
