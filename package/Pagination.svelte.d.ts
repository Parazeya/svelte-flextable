import { SvelteComponentTyped } from "svelte";
import type { DataHandler } from './core';
declare const __propDef: {
    props: {
        handler: DataHandler;
        small?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
export default class Pagination extends SvelteComponentTyped<PaginationProps, PaginationEvents, PaginationSlots> {
}
export {};
