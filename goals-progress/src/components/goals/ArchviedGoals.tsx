import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import GoalsList from './GoalsList';
import Loading from '../common/Loading';

export default observer(function ArchviedGoals() {
  const {goalStore} = useStore();
  const {archivedGoals, loadGoals, initialLoading, goalsLoaded} = goalStore;

  useEffect(() => {
    if (!goalsLoaded) loadGoals();
  }, [loadGoals, goalsLoaded]);
  
  if (initialLoading) return <Loading/>

  return (
    <>
      <div className="goals container shadow">
        {archivedGoals.length > 0 
        ?
          <GoalsList goals={archivedGoals}/>
        :
          <h2 className="text-center outline outline-primary">You have no archived goals</h2>
        }
      </div>
    </>
  )
})
