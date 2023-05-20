import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Goals from './components/Goals';
import GoalDetails from './components/GoalDetails';
import GoalCreateForm from './components/GoalCreateForm';
import ArchviedGoals from './components/ArchviedGoals';
import Settings from './components/Settings';
import { Goal } from './interfaces/GoalInterface';
import axios from 'axios';

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    getGoals();
  }, []);

  // get goals
  const getGoals = () => {
    axios.get('http://localhost:5000/api/goals')
    .then(response => {
      setGoals(response.data);
    })
  }

  // add goal
  const addGoal = (newGoal: Goal) => {
    setGoals([ ...goals, newGoal]);
  }

  // update goal
  const updateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => {
      if (goal.id === updatedGoal.id) {
        return updatedGoal
      } else {
        return goal;
      }
    }));
  }

  // delete goal
  const deleteGoal = (id: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        return { ...goal, status: 3 }; // zmieniam status na 3 (usuniety)
      } else {
        return goal;
      }
    }));
  }

  // archive goal
  const archiveGoal = (id: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        return { ...goal, status: 2 }; // zmieniam status na 2 (zarchiwizowany)
      } else {
        return goal;
      }
    }));
  }

  // restore goal
  const restoreGoal = (id: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        return { ...goal, status: 1 }; // zmieniam status na 1 (aktualny)
      } else {
        return goal;
      }
    }));
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header appName='GoalsProgress'/>
        <Routes>
          <Route path='/' element={<Goals goals={goals}/>}/>
          <Route path='/goals' element={<Goals goals={goals}/>}/>
          <Route 
            path='/goal/:id' 
            element={
            <GoalDetails 
                  goals={goals} 
                  onDelete={deleteGoal} 
                  onArchive={archiveGoal} 
                  onRestore={restoreGoal}
                  onUpdate={updateGoal}
            />
            }
          />
          <Route path='/goals/create' element={<GoalCreateForm onAdd={addGoal}/>}/>
          <Route path='/archived' element={<ArchviedGoals goals={goals}/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
