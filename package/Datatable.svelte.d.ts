import { SvelteComponentTyped } from "svelte";
import { type DataHandler } from './core';
declare const __propDef: {
    props: {
        handler: DataHandler;
        search?: boolean;
        rowsPerPage?: boolean;
        rowCount?: boolean;
        pagination?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DatatableProps = typeof __propDef.props;
export type DatatableEvents = typeof __propDef.events;
export type DatatableSlots = typeof __propDef.slots;
export default class Datatable extends SvelteComponentTyped<DatatableProps, DatatableEvents, DatatableSlots> {
}
export {};
