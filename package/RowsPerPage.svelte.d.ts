import { SvelteComponentTyped } from "svelte";
import type { DataHandler } from './core';
declare const __propDef: {
    props: {
        handler: DataHandler;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type RowsPerPageProps = typeof __propDef.props;
export type RowsPerPageEvents = typeof __propDef.events;
export type RowsPerPageSlots = typeof __propDef.slots;
export default class RowsPerPage extends SvelteComponentTyped<RowsPerPageProps, RowsPerPageEvents, RowsPerPageSlots> {
}
export {};
