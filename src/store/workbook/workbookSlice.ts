import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorkbookState } from "../../types";
import { createInitialCells, parseInput } from "../../helpers/util";

const initialState: WorkbookState = {
    cellData: createInitialCells(),
}

export const workbookSlice = createSlice({
    name: 'workbook',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<{rowIndex: number, cellIndex: number, value: any}>) => {
            state.cellData[action.payload.rowIndex][action.payload.cellIndex] = parseInput(action.payload.value);
        }
    }
});

export const { updateCell } = workbookSlice.actions;
export default workbookSlice.reducer;