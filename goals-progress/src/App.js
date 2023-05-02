import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Goals from './components/Goals';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
