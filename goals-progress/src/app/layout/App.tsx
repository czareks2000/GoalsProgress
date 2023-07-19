import './App.css';
import { Outlet, useLocation } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';
import HomePage from '../../components/home/HomePage';

export default observer(function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' 
      ? <HomePage /> 
      : (
        <>
        <div className="wrapper">
          <Header appName='GoalsProgress'/>
          <Outlet />
        </div>
        <Footer/>
        </>
      )}
    </>
  );
})
