import { styled } from "styled-components";
import { useAppDispatch, useDetectOutsideClick } from "../hooks";
import { updateCell } from "../store/workbook/workbookSlice";
import { useRef, useState } from "react";
import { CellData } from "../types";

const Input = ({initialData, handleDataInput, handleClearInput, handleOutsideClick, inputRef}: any) => {
    const wrapperRef = useRef(null);
    const [ newData, setNewData ] = useState<string>(initialData);

    useDetectOutsideClick(wrapperRef, () => {
        handleOutsideClick();
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleDataInput(newData);
            setNewData('');
        }
        else if (e.key === 'Escape') {
            handleClearInput();
            setNewData('');
        }
    }

    return (
        <div ref={wrapperRef}>
            <DataInput
                autoFocus
                id="dataInput"
                key="dataInput"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                    setNewData(e.target.value)
                }}
                value={newData as string}
                ref={inputRef}
            />
        </div>
    )
}

function Cell({cellData, rowIndex, cellIndex} : { cellData: CellData, rowIndex: number, cellIndex: number}) {
    const dispatch = useAppDispatch();
    const [ editMode, setEditMode ] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
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

    function handleOutsideClick() {
        if (inputRef.current && inputRef.current.value) {
            handleDataInput(inputRef.current.value);
        }
        else {
            handleDataInput('');
        }
        handleClearInput();
    }


    if (editMode) {
        return (
            <td>
                <Input
                    initialData={cellData.rawData}
                    handleDataInput={handleDataInput}
                    handleClearInput={handleClearInput}
                    handleOutsideClick={handleOutsideClick}
                    inputRef={inputRef}
                />
            </td>
        );
    }
    else {
        return (
            <td
                onClick={() => {
                    setEditMode(true)
                }}
            >
                {cellData.displayData}
            </td>
        );
    }
}

export default Cell;

const DataInput = styled.input`
    z-index: 10;
    position: absolute;
    left: -2px;
    top: -.2rem;
    height: 1.5rem;
    width: 80px;
`;