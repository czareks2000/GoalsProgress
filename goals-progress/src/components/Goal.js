const Goal = ({ goal }) => {
  return (
    <div className="goal">
        <div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p> 
            <small>Zostało: {goal.daysLeft} dni</small>
        </div>
        <div className="progress-bar">
            <progress 
                value={goal.progress}
                min="0" 
                max="100" 
                style={{visibility: 'hidden', height: 0, width:0 }}
            >
            </progress>
        </div>
    </div>
  )
}

export default Goal
