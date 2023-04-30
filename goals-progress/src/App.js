import './App.css';
import { FaPlus } from 'react-icons/fa'

import Goals from './components/Goals';
import Button from './components/Button';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <div className="goals container shadow">
          <div className="content">
            <Goals/>
          </div>
        </div>
        <div className="text-center">
          <Button text={<FaPlus className='icon'/>} color={'#39a0ca'}/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
