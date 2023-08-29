import { FaPlus, FaEdit, FaTrash, FaFolder, FaCircleNotch } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Dialog from '../common/Dialog';

export default observer(function Actions() {
    // State
    const {goalStore, detailsPageStore} = useStore();
    const {selectedGoal: goal, changeStatus, loading} = goalStore;
    const {visibleAddProgressForm, visibleEditGoalForm, visibleProgressList, 
        toggleAddProgressForm, toggleEditGoalForm, addProgressActionStatus, 
        editGoalActionStatus, archiveGoalActionStatus} = detailsPageStore;

    // Dialog
    const [showDialog, setShowDialog] = useState(false);
    
    // Actions
    const navigate = useNavigate();

    const handleDeleteGoal = async () => {
        await changeStatus(goal!.id, GoalStatus.Deleted);
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
                confirmButtonText={
                    loading ? <FaCircleNotch className="spinner"/> : "Delete"}
                cancelButtonText="Cancel"
                onConfirm={handleDeleteGoal}
                onCancel={() => setShowDialog(false)}
            />
        )}
        <div className="actions text-center">
            <div 
                className={`action 
                        ${visibleAddProgressForm ? 'active' : ''}
                        ${showDialog || addProgressActionStatus ? 'disabled' : ''}`} 
                onClick={toggleAddProgressForm}
            >
                {visibleAddProgressForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaPlus/>Progress</> 
                }
            </div>
            <div 
                className={`action 
                        ${visibleEditGoalForm ? 'active' : ''} 
                        ${showDialog || editGoalActionStatus ? 'disabled' : ''}`} 
                onClick={toggleEditGoalForm}
            >
                {visibleEditGoalForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaEdit/>Edit</> 
                }
            </div>
            <div 
                className={`action 
                        ${showDialog || !visibleProgressList ? 'disabled' : ''}`} 
                onClick={() => setShowDialog(true)}
            >
                <><FaTrash/>Delete</>
            </div>
            <div 
                className={`action 
                        ${showDialog || archiveGoalActionStatus ? 'disabled' : ''}`}  
                onClick={goal.status === GoalStatus.Current ? handleArchiveGoal : handleRestoreGoal}
            >
                {goal.status === GoalStatus.Archvied ? 
                <><RiArrowGoBackFill/>Restore</> 
                : 
                <><FaFolder/>Archive</>
                }
            </div>
        </div>
    </>
  )
})