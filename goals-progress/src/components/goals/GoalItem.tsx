import moment from 'moment';
import { Goal } from '../../app/models/Goal';
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { format } from 'date-fns';

interface Props {
  goal: Goal;
}

const GoalItem = ({ goal }: Props) => {

  const daysLeft = () => {
    const today = moment();
    const deadline = moment(goal.deadline, 'YYYY-MM-DD');
    return deadline.diff(today, 'days');
  }

  const currentProgress = () => {
    return Math.round(goal.currentValue / goal.targetValue! * 100);
  }

  return (
    <div className="goal outline">
        <div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p>
            <div className="stats">
              <div>
                Progress: {goal.currentValue}/{goal.targetValue} {goal.unit}
              </div>
              {goal.status == GoalStatus.Current 
                ? <div>{daysLeft()} Days Left</div>
                : <div>Archived: {format(goal.modificationDate!, 'dd MMM yyyy')}</div>
              }
            </div> 
        </div>
        <div 
          className="progress-bar"
          data-value={`${currentProgress()}%`}
          style={{ '--progress': `${currentProgress()}%` } as any}
        >  
        </div>
    </div>
  )
}

export default GoalItem
