import { useState } from "react";

import GoalForm from "./GoalForm"

const GoalEditForm = ({ goalToEdit, onUpdate, toggleEditForm }) => {
    const [goal, setGoal] = useState(goalToEdit);

    const onSubmit = (e) => {
        e.preventDefault();
    
        onUpdate(goal);
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
}

export default GoalEditForm
