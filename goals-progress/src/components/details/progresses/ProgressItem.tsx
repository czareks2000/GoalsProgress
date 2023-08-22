import { FaCircleNotch, FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { Progress } from '../../../app/models/Progress';
import { GoalStatus } from '../../../app/models/enums/GoalStatus';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { GoalType } from '../../../app/models/enums/GoalType';
import { format } from 'date-fns';
import { useState } from 'react';

interface Props {
  progress: Progress;
}

export default observer(function ProgressItem({ progress }: Props) {
  const {goalStore} = useStore();
  const {selectedGoal: goal, deleteProgress, showEditProgressForm, loading: apiLoading} = goalStore;

  const [loading, setLoading] = useState(false);

  const color = () => {
    return goal?.status === GoalStatus.Completed ? "accent" : "primary";
  }

  if (!goal) return <></>

  return (
    <div className={`progress outline outline-${color()}`}>
        <div className="progress-value">
            <FaPlus/>
            <p>{progress.value}</p>
        </div>
        <div className="progress-details">
            <p>
              {goal.type === GoalType.Standard 
                ? progress.description 
                : `${progress.category?.name} (x ${progress.category?.multiplier})`
              }
            </p>
            <small>{format(progress.date!, 'dd MMM yyyy')}</small>
        </div>
        {(goal.status === GoalStatus.Current || apiLoading) && 
        <div className="progress-actions">
          <FaEdit onClick={() => showEditProgressForm(progress)}/>
          {loading ? 
            <FaCircleNotch className="spinner"/>
          :
            <FaTrash onClick={() => {
              setLoading(true);
              deleteProgress(progress.id, goal.id)
                .finally(() => setLoading(false));
            }}/>
          }
        </div>
        }
    </div>
  )
})
