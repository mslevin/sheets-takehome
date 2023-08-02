// Utility functions for use throughout the Sheets app

import { A_STRING_CODE, STATIIC_WORKBOOK_SIZE } from "../constants";
import { CellData } from "../types"

// Create the necessary initial data for the Workbook slice
// Used in workbookSlice.ts
export function createInitialCells(): CellData[][] {
    return new Array(STATIIC_WORKBOOK_SIZE).fill(0).map(() => new Array(STATIIC_WORKBOOK_SIZE).fill({rawData: '', displayData: ''}));
}

// Given some input cellId, return the data coordinates
// Examples: A1 --> [0,0], D4 --> [3,3]
// Letter refers to the COLUMN, number refers to the ROW
export function sheetToDataCoords(cellId: string): number[] {
    return [cellId[0].charCodeAt(0) - A_STRING_CODE, Number(cellId[1]) - 1];
}

export function dataCoordToCellId(coords: number[]): string {
    return String.fromCharCode(coords[1] + A_STRING_CODE) + (coords[0] + 1);
}