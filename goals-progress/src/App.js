import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Goals from './components/Goals';
import GoalDetails from './components/GoalDetails';
import GoalCreateForm from './components/GoalCreateForm';
import ArchviedGoals from './components/ArchviedGoals';
import Settings from './components/Settings';


function App() {
  const goals = [
    {
      id: 1,
      name: 'Filmy',
      description: 'Obejrzeć 20 filmów',
      currentValue: 4,
      targetValue: 20,
      progress: 20,
      daysLeft: 230
    },
    {
      id: 2,
      name: 'Przepisy',
      description: 'Wypróbować 10 nowych przepisów',
      currentValue: 5,
      targetValue: 10,
      progress: 50,
      daysLeft: 230
    },
    {
      id: 3,
      name: 'Książki',
      description: 'Przeczytać 10 książek',
      currentValue: 3,
      targetValue: 10,
      progress: 30,
      daysLeft: 230
    },
    {
      id: 4,
      name: 'Badanie krwi',
      description: 'Zrobić morfologie krwi 2 razy',
      currentValue: 1,
      targetValue: 2,
      progress: 50,
      daysLeft: 230
    }
  ]

  // add goal
  const addGoal = (goal) => {
    console.log(goal);
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals goals={goals}/>}/>
          <Route path='/goals' element={<Goals goals={goals}/>}/>
          <Route path='/goal/:id' element={<GoalDetails goals={goals}/>}/>
          <Route path='/goals/create' element={<GoalCreateForm onAdd={addGoal}/>}/>
          <Route path='/archived' element={<ArchviedGoals/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
