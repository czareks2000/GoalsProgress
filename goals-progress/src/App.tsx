import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Goals from './components/Goals';
import GoalDetails from './components/GoalDetails';
import GoalCreateForm from './components/GoalCreateForm';
import ArchviedGoals from './components/ArchviedGoals';
import Settings from './components/Settings';
import { Goal } from './interfaces/GoalInterface';

function App() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: 'Filmy',
      description: 'Obejrzeć 20 filmów',
      currentValue: 4,
      targetValue: 20,
      customUnit: false,
      unit: 'none',
      deadline: '2023-12-31',
      status: 1
    },
    {
      id: 2,
      name: 'Przepisy',
      description: 'Wypróbować 10 nowych przepisów',
      currentValue: 5,
      targetValue: 10,
      customUnit: false,
      unit: 'none',
      deadline: '2023-12-31',
      status: 1
    },
    {
      id: 3,
      name: 'Książki',
      description: 'Przeczytać 10 książek',
      currentValue: 3,
      targetValue: 10,
      customUnit: false,
      unit: 'none',
      deadline: '2023-12-31',
      status: 1
    },
    {
      id: 4,
      name: 'Badanie krwi',
      description: 'Zrobić morfologie krwi 2 razy',
      currentValue: 1,
      targetValue: 2,
      customUnit: true,
      unit: 'szt',
      deadline: '2023-12-31',
      status: 2
    }
  ]);

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
