import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Goals from './components/Goals';
import Header from './components/Header';
import Footer from './components/Footer';
import GoalCreateForm from './components/GoalCreateForm';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals/>}/>
          <Route path='/goals' element={<Goals/>}/>
          <Route path='/goals/create' element={<GoalCreateForm/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
