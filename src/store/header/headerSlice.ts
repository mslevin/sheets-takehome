import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HeaderState {
    title: string;
};

const initialState: HeaderState = {
    title: 'New Spreadsheet',
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        updateTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        }
    }
});

export const { updateTitle } = headerSlice.actions;
export default headerSlice.reducer;