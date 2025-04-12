import { Goal } from '../../app/models/Goal';
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';

interface Props {
  goal: Goal;
}

export default observer(function GoalItem({ goal }: Props) {
  const {commonStore: {roundValue}}= useStore();

  const daysLeft = () => {
    const today = dayjs();
    const deadline = dayjs(goal.deadline, 'YYYY-MM-DD');
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
          return <div>Archived: {dayjs(goal.modificationDate!).format('dd MMM YYYY')}</div>
      case GoalStatus.Completed:
          return <div>Completed: {dayjs(goal.completedDate!).format('dd MMM YYYY')}</div>
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
