import './App.css';
import { FaPlus } from 'react-icons/fa'

import Goals from './components/Goals';
import Button from './components/Button';

function App() {
  return (
    <>
    <div className="container">
      <div className="content">
        <Goals/>
      </div>
      
    </div>
    <div className="my-1 text-center">
      <Button text={
        <>
          <FaPlus style={{ verticalAlign: 'middle' }}/> NEW GOAL
        </>
      } color={'#39a0ca'}/>
    </div>
  </>
  );
}

export default App;
