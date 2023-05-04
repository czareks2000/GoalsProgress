const Goal = ({ goal }) => {
  return (
    <div className="goal outline">
        <div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p>
            <div className="stats">
              <div>
                Progress: {goal.currentValue}/{goal.targetValue} {goal.unit !== 'none' && goal.unit}
              </div>
              <div>{goal.daysLeft} Days Left</div>
            </div> 
        </div>
        <div 
          className="progress-bar"
          data-value={`${goal.progress}%`}
          style={{ '--progress': `${goal.progress}%` }}
        >  
        </div>
    </div>
  )
}

export default Goal
