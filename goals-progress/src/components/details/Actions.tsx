import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    onShowAddForm: () => void;
    showAddForm: boolean;
    onShowEditForm: () => void;
    showEditForm: boolean;
}

export default observer(function Actions({ onShowAddForm, showAddForm, onShowEditForm, showEditForm }: Props) {
    const {goalStore} = useStore();
    const {selectedGoal: goal, changeStatus} = goalStore;

    const navigate = useNavigate();

    const handleDeleteGoal = () => {
        changeStatus(goal!.id, GoalStatus.Deleted);
        navigate('/');
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
                        ${goal.status !== GoalStatus.Current || showAddForm ? 'disabled' : ''}`} 
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
                onClick={goal.status === GoalStatus.Current ? handleArchiveGoal : handleRestoreGoal}
            >
                {goal.status === GoalStatus.Current ? 
                <><FaFolder/>Archive</>
                : 
                <><RiArrowGoBackFill/>Restore</> 
                }
            </div>
        </div>
  )
})