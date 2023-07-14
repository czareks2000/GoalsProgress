import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import GoalItem from "../goals/GoalItem";
import Actions from "./Actions";
import ProgressList from "./progresses/ProgressList";
import ProgressAddForm from "../forms/progress/ProgressAddForm";
import GoalEditForm from "../forms/goal/GoalEditForm";
import { Progress } from "../../app/models/Progress";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Goal } from "../../app/models/Goal";

export default observer(function GoalDetails() {
    const {goalStore} = useStore();
    const {selectedGoal: goal, loadGoal} = goalStore;

    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showProgressList, setShowProgressList] = useState<boolean>(true);

    const {id} = useParams();

    useEffect(() => {
        if (id) loadGoal(parseInt(id));
    }, [id, goal])

    
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };

    // add progress
    const addProgress = (progress: Progress) => {
        //setProgressList([ ...progressList, progress]);
        setShowAddForm(false);
    }

    if (!goal) return <></>

    return (
        <div className="container shadow">
            <GoalItem goal={goal as Goal}/>
            <Actions 
                showAddForm={showAddForm} 
                onShowAddForm={toggleAddForm}
                showEditForm={showEditForm}
                onShowEditForm={toggleEditForm}
            />
            {showAddForm && <ProgressAddForm onAdd={addProgress} toggleAddForm={toggleAddForm}/>}
            {showEditForm && <GoalEditForm goalToEdit={goal as Goal} toggleEditForm={toggleEditForm} />}
            {showProgressList && <ProgressList />}
        </div>
    )
})
