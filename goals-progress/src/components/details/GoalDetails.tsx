import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import GoalItem from "../goals/GoalItem";
import Actions from "./Actions";
import ProgressList from "./progresses/ProgressList";
import ProgressAddForm from "../forms/progress/ProgressAddForm";
import GoalEditForm from "../forms/goal/GoalEditForm";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import Button from "../common/Button";
import { GoalType } from "../../app/models/enums/GoalType";
import CategoryAddForm from "../forms/category/CategoryAddForm";

export default observer(function GoalDetails() {
    // State
    const {goalStore} = useStore();
    const {selectedGoal: goal, selectedProgresses: progresses, 
        selectedCategories: categories, loadGoal} = goalStore;

    // Forms
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [showProgressList, setShowProgressList] = useState<boolean>(true);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setShowProgressList(!showProgressList);
    };

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setShowProgressList(!showProgressList);
    };
    
    // Loading more progresses
    const [loadedProgressesCount, setLoadedProgressesCount] = useState(5);

    // Fetching data from api
    const {id} = useParams();
    useEffect(() => {
        if (id) loadGoal(parseInt(id));
    }, [id, goal, loadGoal])

    if (!goal) return <></>

    return (
        <>  
            <div className="details container shadow">
                <GoalItem goal={goal}/>
                <Actions 
                    showAddForm={showAddForm} 
                    onShowAddForm={toggleAddForm}
                    showEditForm={showEditForm}
                    onShowEditForm={toggleEditForm}
                />
                {categories.length > 0 && showAddForm && 
                    <ProgressAddForm toggleAddForm={toggleAddForm}/>}
                {goal.type === GoalType.Extended && showAddForm && 
                    <CategoryAddForm/>}
                {showEditForm && 
                    <GoalEditForm toggleEditForm={toggleEditForm} />}
                {showProgressList && 
                    <ProgressList progresses={progresses.slice(0, loadedProgressesCount)}/>}
            </div>
            {progresses.length > loadedProgressesCount && showProgressList &&
            <div className="text-center">
                <Button 
                    text={'Load more'} 
                    onClick={() => setLoadedProgressesCount(loadedProgressesCount+5)}
                />
            </div>
            }
        </>
    )
})
