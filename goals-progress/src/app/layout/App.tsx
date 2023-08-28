import './App.css';
import { Outlet, useLocation } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';
import HomePage from '../../components/home/HomePage';
import Info from '../../components/common/Info';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import Loading from '../../components/common/Loading';

export default observer(function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  const {info, clearInfo} = commonStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setApploaded());
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <div className='center'><Loading/></div>

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
