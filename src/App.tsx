import { styled } from 'styled-components';
import Workbook from './components/Workbook';

function App() {
  return (
    <>
      <HeaderContainer>
          New Spreadsheet
      </HeaderContainer>
      <Toolbar/>
      <Workbook/>
    </>
  )
}

export default App;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Toolbar = styled.div`
  height: 3px;
  background-color: lightgrey;
  border-radius: 10px;
  margin: 5px 0px 5px 0px;
`;