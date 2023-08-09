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
    const {goalStore, detailsPageStore} = useStore();
    const {selectedGoal: goal, selectedProgresses: progresses, 
        selectedCategories: categories, loadGoal} = goalStore;
    const {showAddForm, showEditForm, showProgressList, 
        setInitialValues} = detailsPageStore;
    
    // Loading more progresses
    const [loadedProgressesCount, setLoadedProgressesCount] = useState(5);

    // Fetching data from api
    const {id} = useParams();
    useEffect(() => {
        if (id) loadGoal(parseInt(id));
        setInitialValues();
    }, [id, goal, loadGoal, setInitialValues])

    if (!goal) return <></>

    return (
        <>  
            <div className="details container shadow">
                <GoalItem goal={goal}/>
                <Actions />
                {((goal.type === GoalType.Extended && categories.length > 0 ) || 
                (goal.type === GoalType.Standard)) && showAddForm && 
                    <ProgressAddForm/>
                }
                {goal.type === GoalType.Extended && showAddForm && 
                    <CategoryAddForm/>
                }
                {showEditForm && 
                    <GoalEditForm/>
                }
                {showProgressList && 
                    <ProgressList progresses={progresses.slice(0, loadedProgressesCount)}/>
                }
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
