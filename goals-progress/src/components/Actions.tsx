import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Goal } from '../interfaces/GoalInterface';

interface Props {
    onShowAddForm: () => void;
    showAddForm: boolean;
    onShowEditForm: () => void;
    showEditForm: boolean;
    onDelete: (id: number) => void;
    onArchive:(id: number) => void;
    onRestore: (id: number) => void;
    goal: Goal;
}

const Actions = ({ onShowAddForm, showAddForm, onShowEditForm, showEditForm, onDelete, onArchive, onRestore, goal }: Props) => {

    const navigate = useNavigate();

    const handleDeleteGoal = () => {
        onDelete(goal.id);
        navigate('/');
    }

    const handleArchiveGoal = () => {
        onArchive(goal.id);
        navigate(`/goal/${goal.id}`);
    }

    const handleRestoreGoal = () => {
        onRestore(goal.id);
        navigate(`/goal/${goal.id}`);
    }
    
    return (
        <div className="actions text-center">
            <div 
                className={`action 
                        ${showAddForm ? 'active' : ''}
                        ${goal.status !== 1 || showEditForm ? 'disabled' : ''}`} 
                onClick={onShowAddForm}
            >
                {showAddForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaPlus/>Progress</> 
                }
            </div>
            <div 
                className={`action 
                        ${showEditForm ? 'active' : ''} 
                        ${goal.status !== 1 || showAddForm ? 'disabled' : ''}`} 
                onClick={onShowEditForm}
            >
                {showEditForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaEdit/>Edit</> 
                }
            </div>
            <div 
                className={`action 
                        ${showAddForm || showEditForm ? 'disabled' : ''}`} 
                onClick={handleDeleteGoal}
            >
                <><FaTrash/>Delete</>
            </div>
            <div 
                className={`action 
                        ${showAddForm || showEditForm ? 'disabled' : ''}`}  
                onClick={goal.status === 1 ? handleArchiveGoal : handleRestoreGoal}
            >
                {goal.status === 1 ? 
                <><FaFolder/>Archive</>
                : 
                <><RiArrowGoBackFill/>Restore</> 
                }
            </div>
        </div>
  )
}

export default Actions
