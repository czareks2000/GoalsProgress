import moment from 'moment';
import { Goal } from '../../app/models/Goal';
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { format } from 'date-fns';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
  goal: Goal;
}

export default observer(function GoalItem({ goal }: Props) {
  const {commonStore: {roundValue}}= useStore();

  const daysLeft = () => {
    const today = moment();
    const deadline = moment(goal.deadline, 'YYYY-MM-DD');
    return deadline.diff(today, 'days');
  }

  const currentProgress = () => {
    return Math.round(goal.currentValue / goal.targetValue! * 100);
  }

  const color = () => {
    return goal.status === GoalStatus.Completed ? "accent" : "primary";
  }

  const renderModificationDate = (status: GoalStatus) => {
    switch (status) {
      case GoalStatus.Current:
          return <div>{daysLeft()} Days Left</div>
      case GoalStatus.Archvied:
          return <div>Archived: {format(goal.modificationDate!, 'dd MMM yyyy')}</div>
      case GoalStatus.Completed:
          return <div>Completed: {format(goal.completedDate!, 'dd MMM yyyy')}</div>
    }
  }

  return (
    <div className={`goal outline outline-${color()}`}>
        <div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p>
            <div className="stats">
              <div>
                Progress: {roundValue(goal.currentValue)}/{goal.targetValue} {goal.unit}
              </div>
              {renderModificationDate(goal.status)}
            </div> 
        </div>
        <div 
          className="progress-bar"
          data-value={`${currentProgress()}%`}
          style={{
            '--progress': `${currentProgress()}%`,
            '--color': `var(--${color()})`
          } as React.CSSProperties}
        >  
        </div>
    </div>
  )
})
