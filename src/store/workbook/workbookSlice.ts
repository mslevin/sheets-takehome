import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CellData, WorkbookState } from "../../types";
import { createInitialCells, dataCoordToCellId, sheetToDataCoords } from "../../helpers/util";
import { STATIIC_WORKBOOK_SIZE } from "../../constants";

// Parse user cell input and return a fully formed CellData object
function parseCellUpdate(state: WorkbookState, value: string): CellData {
    // If the first character in the input string is '=', we know the input is a function
    if (value[0] === '=') {
        // formula input only supports adding other cells together eg. '=A2+B2'
        // Because we only need to handle addition, we'll pull the operands out of the formula
        // At the same time, we'll turn them into coordinates (eg. A1 --> [0,0], B1 --> [0,1])
        try {
            const operands = value.slice(1).split('+').map((op: string) => sheetToDataCoords(op));
            // Add up the total of all values in the cell
            const total = operands.reduce((partialSum: number, a: number[]) => partialSum + Number(state.cellData[a[1]][a[0]].displayData), 0);
    
            return {
                rawData: value,
                displayData: total.toString(),
            };
        }
        catch (e) {
            console.error('Error parsing input! Ignoring...', );
            console.error(e);
            return {
                rawData: '',
                displayData: '',
            }
        }
        
    }
    // If the input isn't a function, there's no more parsing to do, so just return the raw value
    else {
        return {
            rawData: value,
            displayData: value,
        };
    }
}

// Once a cell is updated, we need to make sure to update all cells that reference that cell to maintain reactivity in the sheet
// We'll do this recursively:
//  1) Look for any cell that references the cell that we just updated
//  2) If found, parse the raw value of that cell, which will use the new data in the cell we just updated
//  3) For THAT cell, do the same thing: look for any cells that reference that cell
function updateOtherCells(state: WorkbookState, updatedRow: number, updatedCol: number) {
    // Once that cell is updated, we also need to update every cell that references that cell
    for(let row=0;row<STATIIC_WORKBOOK_SIZE;row++) {
        for(let col=0;col<STATIIC_WORKBOOK_SIZE;col++) {
            if (state.cellData[row][col].rawData.includes(dataCoordToCellId([updatedRow, updatedCol]))) {
                state.cellData[row][col] = parseCellUpdate(state, state.cellData[row][col].rawData);
                updateOtherCells(state, row, col);
            }
        }
    }
}

const initialState: WorkbookState = {
    cellData: createInitialCells(),
}

export const workbookSlice = createSlice({
    name: 'workbook',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<{rowIndex: number, cellIndex: number, value: any}>) => {
            state.cellData[action.payload.rowIndex][action.payload.cellIndex] = parseCellUpdate(state, action.payload.value);
            updateOtherCells(state, action.payload.rowIndex, action.payload.cellIndex);
        }
    }
});

export const { updateCell } = workbookSlice.actions;
export default workbookSlice.reducer;