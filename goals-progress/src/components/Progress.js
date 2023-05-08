import { FaPlus, FaTrash } from 'react-icons/fa'

const Progress = ({ progress, onDelete, goalStatus }) => {
  return (
    <div className="progress outline">
        <div className="progress-value">
            <FaPlus/>
            <p>{progress.value}</p>
        </div>
        <div className="progress-details">
            <p>{progress.description}</p>
            <small>{progress.date}</small>
        </div>
        {goalStatus === 1 && 
        <div className="progress-delete" onClick={() => onDelete(progress.id)}>
          <FaTrash/>
        </div>
        }
        
    </div>
  )
}

export default Progress
