/**
 *  Type declarations used throughout the app
 */ 

// Workbook types
export interface CellData {
    rawData: string, // exactly what the user has typed in, eg '23' or '=A4+A12+M3'
    displayData: string, // parsed value/formula which will be displayed in the sheet
}

// Store types
export interface WorkbookState {
    cellData: CellData[][];
};