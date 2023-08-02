import { styled } from "styled-components";
import { LegacyRef, useRef, useState } from "react";

import { useAppDispatch, useDetectOutsideClick } from "../helpers/hooks";
import { updateCell } from "../store/workbook/workbookSlice";
import { CellData } from "../helpers/types";

interface InputProps {
    initialData: string,
    handleDataInput: (input: string) => void;
    handleClearInput: () => void;
    handleOutsideClick: () => void;
    inputRef: LegacyRef<HTMLInputElement>;
}

const Input = (props: InputProps) => {
    const wrapperRef = useRef(null);
    const [ newData, setNewData ] = useState<string>(props.initialData);

    useDetectOutsideClick(wrapperRef, () => {
        props.handleOutsideClick();
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.handleDataInput(newData);
            setNewData('');
        }
        else if (e.key === 'Escape') {
            props.handleClearInput();
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
                ref={props.inputRef}
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