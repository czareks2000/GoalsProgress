import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import Goals from '../../components/goals/CurrentGoals';
import GoalDetails from '../../components/details/GoalDetails';
import GoalCreateForm from '../../components/forms/goal/GoalCreateForm';
import ArchviedGoals from '../../components/goals/ArchviedGoals';
import Settings from '../../components/settings/Settings';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function App() {
  const {goalStore} = useStore();
  const {loadGoals} = goalStore;

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals />}/>
          <Route path='/goals' element={<Goals />}/>
          <Route path='/goal/:id'  element={<GoalDetails />}/>
          <Route path='/goals/create' element={<GoalCreateForm />}/>
          <Route path='/archived' element={<ArchviedGoals />}/>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
})
