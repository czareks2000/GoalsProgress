import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const Actions = ({ onShowAddForm, showAddForm, onShowEditForm, showEditForm, onDelete, onArchive, goal }) => {
    
    const navigate = useNavigate();

    const handleDeleteGoal = () => {
        onDelete(goal.id);
        navigate('/');
    }

    const handleArchiveGoal = () => {
        onArchive(goal.id);
        navigate('/archived');
    }
    
    return (
        <div className="actions text-center">
            <div className={`action ${showAddForm ? 'active' : ''}`} onClick={onShowAddForm}>
                {showAddForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaPlus/>Progress</> 
                }
            </div>
            <div className={`action ${showEditForm ? 'active' : ''}`} onClick={onShowEditForm}>
                {showEditForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaEdit/>Edit</> 
                }
            </div>
            <div className="action" onClick={handleDeleteGoal}>
                <FaTrash/>
                Delete
            </div>
            <div className="action" onClick={handleArchiveGoal}>
                <FaFolder/>
                Archive
            </div>
        </div>
  )
}

export default Actions
