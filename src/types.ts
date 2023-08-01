// Type declarations used throughout the app

// Workbook types
export interface CellData {
    rawData: string,
    displayData: string,
}

// Store types
export interface WorkbookState {
    cellData: CellData[][];
};