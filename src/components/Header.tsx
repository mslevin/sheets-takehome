import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from '../hooks';
// import { updateTitle } from "../store/header/headerSlice";
import { useState } from 'react';

function Header() {
    const title = useAppSelector((state) => state.header.title);
    // const dispatch = useAppDispatch();
    // const [ newTitle, setNewTitle ] = useState('');
    // const [ editMode, setEditMode ] = useState(false);

    // if (editMode) {
    //     return (
    //         <HeaderContainer>
    //             <TitleInput
    //                 autoFocus
    //             />
    //         </HeaderContainer>    
    //     );
        
    // }
    return (
        <HeaderContainer>
            <Title
                // onClick={() => setEditMode(true)}
            >
                {title}
            </Title>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Title = styled.div`
    cursor: pointer;
`;

const TitleInput = styled.input`
    height: 1.25rem;
`;

export default Header;