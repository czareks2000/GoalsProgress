import { FaPlus, FaTrash } from 'react-icons/fa'
import { Progress } from '../interfaces/ProgressInterface';

interface Props {
  progress: Progress;
  onDelete: (id: number) => void;
  goalStatus: number;
}

const ProgressItem = ({ progress, onDelete, goalStatus }: Props) => {
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

export default ProgressItem
