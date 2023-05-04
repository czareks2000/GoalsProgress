const Goal = ({ goal }) => {
  return (
    <div className="goal">
        <div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p> 
            <small>Zostało: {goal.daysLeft} dni</small>
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
