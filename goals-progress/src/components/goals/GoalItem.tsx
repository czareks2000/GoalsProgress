import { Goal } from '../../app/models/Goal';
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';

interface Props {
  goal: Goal;
}

export default observer(function GoalItem({ goal }: Props) {
  const {commonStore: {roundValue, formatDate}}= useStore();

  const today = dayjs();
  const daysLeft = dayjs(goal.deadline).diff(today, 'days');
  const unit = goal.unit;

  const renderCurrentProgress = () => { 
    const currentValue = roundValue(goal.currentValue);
    const targetValue = goal.targetValue;

    return `Progress: ${currentValue} / ${targetValue} ${unit}`;
  }

  const renderStatusInfo = () => {
    const remainingAmount = goal.targetValue! - goal.currentValue
    const dailyAverageToComplete = roundValue(remainingAmount / daysLeft);

    switch (goal.status) {
      case GoalStatus.Current:
          return daysLeft > 0 
            ? `Remaining per day: ${dailyAverageToComplete} ${unit}` 
            : `Remaining: ${roundValue(remainingAmount)} ${unit}`;
      case GoalStatus.Archvied:
          return `Archived`
      case GoalStatus.Completed:
          return `Completed`
    }
  }

  const renderTimeInfo = () => {
    switch (goal.status) {
      case GoalStatus.Current:
          return daysLeft > 0 ? `${daysLeft} Days Left` : 'Deadline passed'
      case GoalStatus.Archvied:
          return `${formatDate(goal.modificationDate)}`
      case GoalStatus.Completed:
          return `${formatDate(goal.completedDate!)}`
    }
  }

  const color = goal.status === GoalStatus.Completed ? "accent" : "primary";
  const progressPercentage = Math.round(goal.currentValue / goal.targetValue! * 100);

  return (
    <div className={`goal outline outline-${color}`}>
        <div>
            <h2>{goal.name}</h2>
            <div>{goal.description}</div>
            <div className="stats">
              <div>
                {renderCurrentProgress()}
              </div>
              <div>
                {renderStatusInfo()}
              </div>
              <div>
                {renderTimeInfo()}
              </div>
            </div> 
        </div>
        <div 
          className="progress-bar"
          data-value={`${progressPercentage}%`}
          style={{
            '--progress': `${progressPercentage}%`,
            '--color': `var(--${color})`
          } as React.CSSProperties}
        >  
        </div>
    </div>
  )
})
