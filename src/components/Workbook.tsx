import { styled } from "styled-components";
import { A_STRING_CODE, STATIIC_WORKBOOK_SIZE } from "../helpers/constants";
import { useAppSelector } from "../helpers/hooks";
import Cell from "./Cell";
import { CellData } from "../helpers/types";

function Workbook() {
    const cells = useAppSelector((state) => state.workbook.cellData);
    // generate an array of column titles: ['A', 'B', 'C', etc]
    const columnTitles = [...Array(STATIIC_WORKBOOK_SIZE).keys()].map(num => String.fromCharCode(A_STRING_CODE + num));

    function generateRows(cells: CellData[][]) {
        return (
            cells.map((row, index) => {
                return (
                    <tr key={'row' + index}>
                        <StyledTh>{index + 1}</StyledTh>
                        {generateCells(row, index)}
                    </tr>
                );
            })
        );
    }

    function generateCells(row: CellData[], rowIndex: number) {
        return row.map((cell, cellIndex) => <Cell cellData={cell} rowIndex={rowIndex} cellIndex={cellIndex} key={rowIndex + ' ' + cellIndex}/>)
    }

    return (
        <StyledTable>
            <tbody>
                <tr>
                    <StyledTh></StyledTh>
                    {columnTitles.map(title => (<StyledTh key={title}>{title}</StyledTh>))}
                </tr>
                {generateRows(cells)}
            </tbody>
        </StyledTable>

    );
}

export default Workbook;

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const StyledTh = styled.th`
    user-select: none;
    border: 1px solid black;
    background-color: #e5e5e5;
    padding: 0px 5px 0px 5px;
`;