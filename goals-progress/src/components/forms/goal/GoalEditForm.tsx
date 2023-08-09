import GoalForm from "./GoalForm"
import { Goal } from "../../../app/models/Goal";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function GoalEditForm()  {
    const {goalStore, detailsPageStore} = useStore();
    const {updateGoal, selectedGoal} = goalStore;
    const {toggleEditForm} = detailsPageStore;

    const submitForm = (goal: Goal) => {
        updateGoal(goal.id, goal);
        toggleEditForm();
    }

    return (
        <GoalForm 
            goal={selectedGoal as Goal}
            onSubmit={submitForm}
            buttonText={'UPDATE'}
            cancelButton={false}
        />
    )
})
