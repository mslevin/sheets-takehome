import { styled } from 'styled-components';
import './App.css'
import Header from './components/Header';
import Workbook from './components/Workbook';

function App() {

  return (
    <>
      <Header/>
      <Toolbar/>
      <Workbook/>
    </>
  )
}

export default App;

const Toolbar = styled.div`
  height: 10px;
  background-color: lightgrey;
  border-radius: 10px;
`;