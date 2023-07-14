import { Link } from 'react-router-dom'

import GoalItem from "./GoalItem"
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export default observer(function ArchviedGoals() {
  const {goalStore} = useStore();
  const {archivedGoals, loadGoals} = goalStore;

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);
  
  return (
    <>
      <div className="goals container shadow">
        {archivedGoals.map((goal) => {
          return(
            <div key={goal.id}>
              <Link to={`/goal/${goal.id}`}>
                <GoalItem goal={goal}/>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
})
