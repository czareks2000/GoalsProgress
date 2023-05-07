import { useState } from "react";

import GoalForm from "./GoalForm"

const GoalEditForm = ({ goalToEdit, onEdit, toggleEditForm }) => {
    const [goal, setGoal] = useState(goalToEdit);

    const onSubmit = (e) => {
        e.preventDefault();
    
        onEdit(goal);

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
