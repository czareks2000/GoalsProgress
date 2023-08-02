import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Dialog from '../common/Dialog';

interface Props {
    onShowAddForm: () => void;
    showAddForm: boolean;
    onShowEditForm: () => void;
    showEditForm: boolean;
}

export default observer(function Actions({ onShowAddForm, showAddForm, onShowEditForm, showEditForm }: Props) {
    // State
    const {goalStore} = useStore();
    const {selectedGoal: goal, changeStatus} = goalStore;

    // Dialog
    const [showDialog, setShowDialog] = useState(false);
    
    // Actions
    const navigate = useNavigate();

    const handleDeleteGoal = () => {
        changeStatus(goal!.id, GoalStatus.Deleted);
        setShowDialog(false);
        navigate('/goals');
    }

    const handleArchiveGoal = () => {
        changeStatus(goal!.id, GoalStatus.Archvied);
        navigate(`/goal/${goal!.id}`);
    }

    const handleRestoreGoal = () => {
        changeStatus(goal!.id, GoalStatus.Current);
        navigate(`/goal/${goal!.id}`);
    }
    
    if (!goal) return <></>

    return (
        <>
        {showDialog && (
            <Dialog 
                label="Confirmation"
                description="Are you sure you want to delete this goal?"
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
                onConfirm={handleDeleteGoal}
                onCancel={() => setShowDialog(false)}
            />
        )}
        <div className="actions text-center">
            <div 
                className={`action 
                        ${showAddForm ? 'active' : ''}
                        ${goal.status !== GoalStatus.Current || showEditForm ? 'disabled' : ''}`} 
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
                        ${goal.status === GoalStatus.Archvied || showAddForm ? 'disabled' : ''}`} 
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
                onClick={() => setShowDialog(true)}
            >
                <><FaTrash/>Delete</>
            </div>
            <div 
                className={`action 
                        ${showAddForm || showEditForm ? 'disabled' : ''}`}  
                onClick={goal.status === GoalStatus.Current ? handleArchiveGoal : handleRestoreGoal}
            >
                {goal.status === GoalStatus.Current ? 
                <><FaFolder/>Archive</>
                : 
                <><RiArrowGoBackFill/>Restore</> 
                }
            </div>
        </div>
    </>
  )
})