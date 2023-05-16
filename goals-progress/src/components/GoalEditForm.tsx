import { FormEvent, useState } from "react";

import GoalForm from "./GoalForm"
import { Goal } from "../interfaces/GoalInterface";

interface Props {
    goalToEdit: Goal; 
    onUpdate: (goal: Goal) => void; 
    toggleEditForm: () => void; 
}

const GoalEditForm = ({ goalToEdit, onUpdate, toggleEditForm }: Props) => {
    const [goal, setGoal] = useState<Goal>(goalToEdit);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
