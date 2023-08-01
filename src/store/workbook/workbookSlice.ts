import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATIIC_WORKBOOK_SIZE } from "../../constants";

function createInitialCells(): any[][] {
    return new Array(STATIIC_WORKBOOK_SIZE).fill(0).map(() => new Array(STATIIC_WORKBOOK_SIZE).fill({data: 'test'}));
}

interface WorkbookState {
    cellData: any[][];
};

const initialState: WorkbookState = {
    cellData: createInitialCells(),
}

export const workbookSlice = createSlice({
    name: 'workbook',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<{rowIndex: number, cellIndex: number, value: any}>) => {
            state.cellData[action.payload.rowIndex][action.payload.cellIndex] = {data: action.payload.value};
        }
    }
});

export const { updateCell } = workbookSlice.actions;
export default workbookSlice.reducer;