import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from '../hooks';
import { updateTitle } from "../store/header/headerSlice";

function Header() {
    const title = useAppSelector((state) => state.header.title);
    const dispatch = useAppDispatch();
    // dispatch(updateTitle('test'))
    return (
        <HeaderContainer>{title}</HeaderContainer>
    );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Header;