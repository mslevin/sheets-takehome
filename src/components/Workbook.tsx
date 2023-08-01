import { STATIIC_WORKBOOK_SIZE } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateCell } from "../store/workbook/workbookSlice";

function Workbook() {
    const cells = useAppSelector((state) => state.workbook.cellData);
    const dispatch = useAppDispatch();
    const columnTitles = [...Array(STATIIC_WORKBOOK_SIZE).keys()].map(num => String.fromCharCode(65 + num));

    function generateCells(row: any[], rowIndex: number) {
        return row.map((cell, cellIndex) => {
            return (
                <td onClick={() => {
                    dispatch(updateCell({
                        rowIndex,
                        cellIndex,
                        value: 'update',
                    }))
                }}>{cell.data}</td>
            );
        })
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th></th>
                    {columnTitles.map(title => (<th>{title}</th>))}
                </tr>
                {cells.map((row, index) => {
                    return (
                        <tr>
                            <th>{index + 1}</th>
                            {generateCells(row, index)}
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );
}

export default Workbook;