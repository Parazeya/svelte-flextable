import { SvelteComponentTyped } from "svelte";
import type { DataHandler } from './core';
declare const __propDef: {
    props: {
        handler: DataHandler;
        orderBy?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ThProps = typeof __propDef.props;
export type ThEvents = typeof __propDef.events;
export type ThSlots = typeof __propDef.slots;
export default class Th extends SvelteComponentTyped<ThProps, ThEvents, ThSlots> {
}
export {};
