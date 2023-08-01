import { FaPlus, FaTrash } from 'react-icons/fa'
import { Progress } from '../../../app/models/Progress';
import { GoalStatus } from '../../../app/models/enums/GoalStatus';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { GoalType } from '../../../app/models/enums/GoalType';
import { format } from 'date-fns';

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
            <p>
              {goal?.type === GoalType.Standard 
                ? progress.description 
                : `${progress.category?.name} (x ${progress.category?.multiplier})`
              }
            </p>
            <small>{format(progress.date!, 'dd MMM yyyy')}</small>
        </div>
        {goal!.status === GoalStatus.Current && 
        <div className="progress-delete" onClick={() => deleteProgress(progress.id, goal!.id)}>
          <FaTrash/>
        </div>
        }
    </div>
  )
})
