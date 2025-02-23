export enum WINDOWS {
    DASHBOARD,
    EXPLORER,
    BLOCKS,
    TRANSACTIONS,
    STATISTICS,
    VALIDATORS
}

export interface ISidebar {
    active_window: WINDOWS
    explorer_query:string
}