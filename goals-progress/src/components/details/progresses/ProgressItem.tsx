import { FaPlus, FaTrash } from 'react-icons/fa'
import { Progress } from '../../../app/models/Progress';
import { GoalStatus } from '../../../app/models/enums/GoalStatus';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
  progress: Progress;
}

export default observer(function ProgressItem({ progress }: Props) {
  const {goalStore} = useStore();
  const {selectedGoal: goal, deleteProgress} = goalStore;

  return (
    <div className="progress outline">
        <div className="progress-value">
            <FaPlus/>
            <p>{progress.value}</p>
        </div>
        <div className="progress-details">
            <p>{progress.description}</p>
            <small>{progress.date}</small>
        </div>
        {goal!.status === GoalStatus.Current && 
        <div className="progress-delete" onClick={() => deleteProgress(progress.id, goal!.id)}>
          <FaTrash/>
        </div>
        }
        
    </div>
  )
})
