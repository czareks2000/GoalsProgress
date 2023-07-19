import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import GoalItem from "../goals/GoalItem";
import Actions from "./Actions";
import ProgressList from "./progresses/ProgressList";
import ProgressAddForm from "../forms/progress/ProgressAddForm";
import GoalEditForm from "../forms/goal/GoalEditForm";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function GoalDetails() {
    const {goalStore} = useStore();
    const {selectedGoal: goal, loadGoal, loadCategories, categories} = goalStore;

    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showProgressList, setShowProgressList] = useState<boolean>(true);

    const {id} = useParams();

    useEffect(() => {
        if (id) loadGoal(parseInt(id));
        if (categories.length === 0) loadCategories();
    }, [id, goal, loadGoal, loadCategories, categories])

    
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };

    if (!goal) return <></>

    return (
        <div className="container shadow">
            <GoalItem goal={goal}/>
            <Actions 
                showAddForm={showAddForm} 
                onShowAddForm={toggleAddForm}
                showEditForm={showEditForm}
                onShowEditForm={toggleEditForm}
            />
            {showAddForm && <ProgressAddForm toggleAddForm={toggleAddForm}/>}
            {showEditForm && <GoalEditForm toggleEditForm={toggleEditForm} />}
            {showProgressList && <ProgressList />}
        </div>
    )
})
