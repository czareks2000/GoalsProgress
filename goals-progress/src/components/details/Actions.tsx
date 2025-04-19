import { FaPlus, FaEdit, FaTrash, FaFolder, FaCircleNotch } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { IoIosStats } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { GoalStatus } from '../../app/models/enums/GoalStatus';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Dialog from '../common/Dialog';
import ActionButton from './ActionButton';
import { GoalType } from '../../app/models/enums/GoalType';

export default observer(function Actions() {
    // State
    const {goalStore, detailsPageStore} = useStore();
    const {selectedGoal: goal, changeStatus, loading} = goalStore;
    const {
        visibleAddProgressForm, visibleEditGoalForm, visibleProgressList, visibleStats,
        toggleAddProgressForm, toggleEditGoalForm, toggleStats, 
        disableAddProgressButton, disableEditButton, disableStatsButton, disableArchiveRestoreButton
    } = detailsPageStore;
    
    const currentGoal = goal?.status === GoalStatus.Current;
    const extendedGoal = goal?.type == GoalType.Extended;

    const classes = `${extendedGoal ? 'extended' : ''} actions text-center`;
    const showStatsActionButton = extendedGoal;
    const showArchiveActionButton = currentGoal;

    // Dialog
    const [showDialog, setShowDialog] = useState(false);

    const toggleShowDialog = () => {
        setShowDialog(prev => !prev);
    }
    
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
                onCancel={toggleShowDialog}
            />
        )}
        <div className={classes}>
            <ActionButton 
                defaultIcon={<FaPlus/>} 
                defaultText={'Progress'} 
                active={visibleAddProgressForm} 
                disabled={showDialog || disableAddProgressButton} 
                onClick={toggleAddProgressForm}
            />
            <ActionButton 
                defaultIcon={<FaEdit/>} 
                defaultText={'Edit'} 
                active={visibleEditGoalForm } 
                disabled={showDialog || disableEditButton} 
                onClick={toggleEditGoalForm}
            />
            {showStatsActionButton && 
            <ActionButton 
                defaultIcon={<IoIosStats/>} 
                defaultText={'Stats'}
                textOnActive={'Close'} 
                active={visibleStats} 
                disabled={showDialog || disableStatsButton} 
                onClick={toggleStats}
            />}
            <ActionButton 
                defaultIcon={<FaTrash/>} 
                defaultText={'Delete'}
                disabled={showDialog || !visibleProgressList} 
                onClick={toggleShowDialog}
            />
            {showArchiveActionButton ?
                <ActionButton 
                    defaultIcon={<FaFolder/>} 
                    defaultText={'Archive'} 
                    disabled={showDialog || disableArchiveRestoreButton} 
                    onClick={handleArchiveGoal}
                />
            :
                <ActionButton 
                    defaultIcon={<RiArrowGoBackFill/>} 
                    defaultText={'Restore'}
                    disabled={showDialog || disableArchiveRestoreButton} 
                    onClick={handleRestoreGoal}
                />
            }
        </div>
    </>
  )
})