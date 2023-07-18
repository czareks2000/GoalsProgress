import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import Goals from '../../components/goals/CurrentGoals';
import GoalDetails from '../../components/details/GoalDetails';
import ArchviedGoals from '../../components/goals/ArchviedGoals';
import Settings from '../../components/settings/Settings';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import GoalCreate from '../../components/forms/goal/GoalCreate';

export default observer(function App() {
  const {goalStore} = useStore();
  const {loadGoals, loadCategories, categories, goalsRegistry} = goalStore;

  useEffect(() => {
    if (goalsRegistry.size <= 0) loadGoals();
    if (categories.length == 0) loadCategories();
  }, [loadGoals]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals />}/>
          <Route path='/goals' element={<Goals />}/>
          <Route path='/goal/:id'  element={<GoalDetails />}/>
          <Route path='/goal/create' element={<GoalCreate />}/>
          <Route path='/archived' element={<ArchviedGoals />}/>
          <Route path='/settings' element={<Settings />}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
})
