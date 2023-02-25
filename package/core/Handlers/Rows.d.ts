import type Context from '../Context';
export default class Rows {
    private triggerChange;
    private triggerMainChange;
    private sorted;
    private pageNumber;
    constructor(context: Context);
    sort(orderBy: Function | string): void;
    private parse;
    private getSorted;
}
