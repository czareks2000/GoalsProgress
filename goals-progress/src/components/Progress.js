import { FaPlus, FaTrash } from 'react-icons/fa'

const Progress = ({ progress }) => {
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
        <div className="progress-delete">
          <FaTrash/>
        </div>
    </div>
  )
}

export default Progress
