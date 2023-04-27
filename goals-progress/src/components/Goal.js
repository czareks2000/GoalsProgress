const Goal = ({ name, progress, description, daysLeft }) => {
  return (
    <div className="goal">
        <div>
            <h2>{name}</h2>
            <p>{description}</p> 
            <small>Zostało: {daysLeft} dni</small>
        </div>
        <div className="progress-bar">
            <progress 
                value={progress}
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
