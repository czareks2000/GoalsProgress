import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Button from '../common/Button'
import { observer } from "mobx-react-lite";
import { useStore } from '../../app/stores/store'
import { useEffect } from 'react';
import GoalsList from './GoalsList';
import Loading from '../common/Loading';


export default observer(function CurrentGoals (){
  const {goalStore} = useStore();
  const {currentGoals, loadGoals, initialLoading, goalsLoaded} = goalStore;

  useEffect(() => {
    if (!goalsLoaded) loadGoals();
  }, [loadGoals, goalsLoaded]);

  if (initialLoading) return <Loading/>

  return (
    <>
      <div className="goals container shadow">
        {currentGoals.length > 0 
        ?
          <GoalsList goals={currentGoals}/>
        :
          <h2 className="text-center outline outline-primary">You have no goals</h2>
        }
      </div>

      <div className="container-without-border text-center">
        <Link to="/goal/create">
          <Button text={<FaPlus/>}/>
        </Link>
      </div>
    </>
  )
})


