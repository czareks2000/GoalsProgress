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
  const {goalStore, detailsPageStore: {showEditProgressForm}} = useStore();
  const {selectedGoal: goal, deleteProgress, loading: apiLoading} = goalStore;

  const [loading, setLoading] = useState(false);

  const color = () => {
    return goal?.status === GoalStatus.Completed ? "accent" : "primary";
  }

  if (!goal) return <></>

  return (
    <div className={`progress outline outline-${color()}`}>
        <div className="progress-value">
            <FaPlus/>
            <p>
              {progress.category  
                ? progress.value * progress.category.multiplier
                : progress.value
              }
            </p>
        </div>
        <div className="progress-details">
            <p>
              {progress.category 
                ? `${progress.category.name} (  ${progress.value!} x ${progress.category.multiplier} )`
                : progress.description 
              }
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
