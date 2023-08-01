import { styled } from "styled-components";
import { useAppDispatch, useDetectOutsideClick } from "../hooks";
import { updateCell } from "../store/workbook/workbookSlice";
import { useRef, useState } from "react";
import { CellData } from "../types";

const Input = ({initialData, handleDataInput, handleClearInput,}: any) => {
    const wrapperRef = useRef(null);
    useDetectOutsideClick(wrapperRef, () => {
        handleClearInput();
    });
    const [ newData, setNewData ] = useState<string>(initialData);

    const updateData = () => {
        handleDataInput(newData);
        setNewData('');
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            updateData();
        }
        else if (e.key === 'Escape') {
            handleClearInput();
            setNewData('');
        }
    }

    return (
        <DataInput
            autoFocus
            key="dataInput"
            onKeyDown={handleKeyDown}
            onChange={(e) => {
                setNewData(e.target.value)
            }}
            value={newData as string}
            ref={wrapperRef}
        />
    )
}

function Cell({cellData, rowIndex, cellIndex} : { cellData: CellData, rowIndex: number, cellIndex: number}) {
    const dispatch = useAppDispatch();
    const [ editMode, setEditMode ] = useState(false);
    
    function handleDataInput(data: string) {
        setEditMode(false);
        dispatch(updateCell({
            cellIndex,
            rowIndex,
            value: data
        }));
    }

    function handleClearInput() {
        setEditMode(false);
    }


    if (editMode) {
        return (
            <StyledTd><Input initialData={cellData.displayData} handleDataInput={handleDataInput} handleClearInput={handleClearInput}/></StyledTd>
        );
    }
    else {
        return (
            <StyledTd
                onClick={() => {
                    setEditMode(true)
                }}
            >
                {cellData.displayData}
            </StyledTd>
        );
    }
}

export default Cell;

const StyledTd = styled.td`
    min-width: 60px;
    border: 1px solid black;
    padding: 0px 3px 0px 3px;
    user-select: none;
    cursor: pointer;
    position: relative;
`;

const DataInput = styled.input`
    z-index: 10;
    position: absolute;
    left: -2px;
    top: -.2rem;
    height: 1.5rem;
    width: 80px;
`;