import { FaCircleNotch, FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { Progress } from '../../../app/models/Progress';
import { GoalStatus } from '../../../app/models/enums/GoalStatus';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  progress: Progress;
}

export default observer(function ProgressItem({ progress }: Props) {
  const {
    goalStore: {selectedGoal: goal, deleteProgress, loading: apiLoading}, 
    detailsPageStore: {showEditProgressForm}, 
    commonStore: {roundValue}
  } = useStore();

  const [loading, setLoading] = useState(false);

  const color = () => {
    return goal?.status === GoalStatus.Completed ? "accent" : "primary";
  }

  const progressValue = () => {
    if (progress.category)
      return roundValue(progress.value * progress.category.multiplier);
    
    return roundValue(progress.value);
  }

  const progressDetails = () => {
    if (progress.category)
      return `${progress.category.name} 
        ( ${roundValue(progress.value!)} x ${progress.category.multiplier} )`

    return progress.description
  }

  if (!goal) return <></>

  return (
    <div className={`progress outline outline-${color()}`}>
        <div className="progress-value">
            <FaPlus/>
            <p>
              {progressValue()}
            </p>
        </div>
        <div className="progress-details">
            <p>
              {progressDetails()}
            </p>
            <small>{format(progress.date!, 'dd MMM yyyy')}</small>
        </div>
        {((goal.status === GoalStatus.Current) || 
          (goal.status === GoalStatus.Deleted && apiLoading)
          ) && 
        <div className="progress-actions">
          <FaEdit onClick={() => showEditProgressForm(progress)}/>
          {loading ? 
            <FaCircleNotch className="spinner"/>
          :
            <FaTrash onClick={() => {
              setLoading(true);
              deleteProgress(progress.id)
                .finally(() => setLoading(false));
            }}/>
          }
        </div>
        }
    </div>
  )
})
