import './App.css';
import { Outlet, useLocation } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';
import HomePage from '../../components/home/HomePage';
import Info from '../../components/common/Info';
import { useStore } from '../stores/store';

export default observer(function App() {
  const location = useLocation();
  const {commonStore} = useStore();
  const {info, clearInfo} = commonStore;

  return (
    <>
      {location.pathname === '/' 
      ? <HomePage /> 
      : (
        <>
        <div className="wrapper">
          <Header appName='GoalsProgress'/>
          {info && 
          <Info 
            color={info.type} 
            message={info.message} 
            onClick={clearInfo}
          />
          }
          <Outlet />
        </div>
        <Footer/>
        </>
      )}
    </>
  );
})
