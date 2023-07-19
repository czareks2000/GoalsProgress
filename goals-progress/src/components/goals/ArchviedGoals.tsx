import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import GoalsList from './GoalsList';

export default observer(function ArchviedGoals() {
  const {goalStore} = useStore();
  const {archivedGoals, goalsRegistry, loadGoals} = goalStore;

  useEffect(() => {
    if (goalsRegistry.size <= 1) loadGoals();
  }, [loadGoals, goalsRegistry]);
  
  return (
    <>
      <div className="goals container shadow">
        {archivedGoals.length > 0 
        ?
          <GoalsList goals={archivedGoals}/>
        :
          <h2 className="text-center outline">You have no archived goals</h2>
        }
      </div>
    </>
  )
})
