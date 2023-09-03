import GoalForm from "./GoalForm"
import { Goal } from "../../../app/models/Goal";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function GoalEditForm()  {
    const {goalStore, detailsPageStore: {toggleEditGoalForm}} = useStore();
    const {updateGoal, selectedGoal} = goalStore;

    const submitForm = async (goal: Goal) => {
        await updateGoal(goal.id, goal);
        toggleEditGoalForm();
    }

    return (
        <GoalForm 
            goal={selectedGoal as Goal}
            onSubmit={submitForm}
            buttonText={'Update'}
        />
    )
})
