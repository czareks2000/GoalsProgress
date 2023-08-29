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
import CategoryAddForm from "../forms/category/CategoryAddForm";
import ProgressEditForm from "../forms/progress/ProgressEditForm";
import Loading from "../common/Loading";

export default observer(function GoalDetails() {
    // State
    const {goalStore, detailsPageStore} = useStore();
    const {selectedGoal: goal, loadGoal, sortedProgresses: progresses,} = goalStore;
    const {visibleEditGoalForm, visibleProgressList, visibleEditProgressForm, 
        setInitialValues, showProgressAddForm, showCategoryAddForm} = detailsPageStore
    
    // Loading more progresses
    const [loadedProgressesCount, setLoadedProgressesCount] = useState(5);

    // Fetching data from api
    const {id} = useParams();
    useEffect(() => {
        if (id) loadGoal(parseInt(id));
        setInitialValues();
    }, [id, loadGoal, setInitialValues])

    if (!goal) return <Loading/>

    return (
        <>  
            <div className="details container shadow">
                <GoalItem goal={goal}/>
                <Actions />
                {showProgressAddForm &&
                    <ProgressAddForm/>
                }
                {visibleEditProgressForm &&
                    <ProgressEditForm />
                }
                {showCategoryAddForm && 
                    <CategoryAddForm/>
                }
                {visibleEditGoalForm && 
                    <GoalEditForm/>
                }
                {visibleProgressList && 
                    <ProgressList progresses={progresses.slice(0, loadedProgressesCount)}/>
                }
            </div>
            {goal.progresses!.length > loadedProgressesCount && visibleProgressList &&
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
