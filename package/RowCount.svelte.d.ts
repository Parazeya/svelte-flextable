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
export type RowCountProps = typeof __propDef.props;
export type RowCountEvents = typeof __propDef.events;
export type RowCountSlots = typeof __propDef.slots;
export default class RowCount extends SvelteComponentTyped<RowCountProps, RowCountEvents, RowCountSlots> {
}
export {};
