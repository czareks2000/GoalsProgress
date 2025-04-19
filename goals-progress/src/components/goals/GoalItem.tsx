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

  

  const renderCurrentProgress = () => { 
    const currentValue = roundValue(goal.currentValue);
    const targetValue = goal.targetValue;
    const unit = goal.unit;

    return `Progress: ${currentValue} / ${targetValue} ${unit}`;
  }

  const renderStatusInfo = () => {
    switch (goal.status) {
      case GoalStatus.Current:
          return `${daysLeft} Days Left`
      case GoalStatus.Archvied:
          return `Archived: ${formatDate(goal.modificationDate)}`
      case GoalStatus.Completed:
          return `Completed: ${formatDate(goal.completedDate!)}`
    }
  }

  const renderDailyAverageToComplete = () => {
    const dailyAverageToComplete = roundValue((goal.targetValue! - goal.currentValue) / daysLeft);

    return `Remaining per day: ${dailyAverageToComplete} ${goal.unit}`;
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
                {renderDailyAverageToComplete()}
              </div>
              <div>
                {renderStatusInfo()}
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
