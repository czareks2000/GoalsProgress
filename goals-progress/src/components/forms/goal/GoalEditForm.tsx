import { FormEvent, useState } from "react";

import GoalForm from "./GoalForm"
import { Goal } from "../../../app/models/Goal";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    goalToEdit: Goal; 
    toggleEditForm: () => void; 
}

export default observer(function GoalEditForm({ goalToEdit, toggleEditForm }: Props)  {
    const {goalStore} = useStore();
    const {updateGoal} = goalStore;
    const [goal, setGoal] = useState<Goal>(goalToEdit);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        updateGoal(goal.id, goal);
        toggleEditForm();
      }

    return (
        <GoalForm 
            goal={goal}
            setGoal={setGoal}
            onSubmit={onSubmit}
            buttonText={'UPDATE'}
        />
    )
})
