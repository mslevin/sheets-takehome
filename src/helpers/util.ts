// Utility functions for use throughout the Sheets app

import { STATIIC_WORKBOOK_SIZE } from "../constants";
import { CellData } from "../types"

// Parses user cell input and returns a fully formed CellData object
// If the first character in the input string is '=', we know the input is a function
// Otherwise, just use the raw input
export function parseInput(input: string): CellData {
    if (input[0] === '=') {
        return {
            rawData: input,
            displayData: eval(input.slice(1)),
        }
    }
    else {
        return {
            rawData: input,
            displayData: input,
        }
    }
}

// Create the necessary initial data for the Workbook slice
// Used in workbookSlice.ts
export function createInitialCells(): CellData[][] {
    return new Array(STATIIC_WORKBOOK_SIZE).fill(0).map(() => new Array(STATIIC_WORKBOOK_SIZE).fill({rawData: '', displayData: ''}));
}