import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebar, WINDOWS } from "../models/ISideBar";

let initialState: ISidebar = {
    active_window: WINDOWS.DASHBOARD,
    explorer_query: ""
}

export const SidebarSlice = createSlice({
    name: 'Sidebar',
    initialState,
    reducers: {
        setActiveWindow: (state, action: PayloadAction<WINDOWS>) => {
            state.active_window = action.payload
        },
        setExplorerQuery: (state, action: PayloadAction<string>) => {
            state.explorer_query = action.payload
        }
    }
})

export default SidebarSlice.reducer;