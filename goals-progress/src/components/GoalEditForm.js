import { useState } from "react";

import GoalForm from "./GoalForm"

const GoalEditForm = ({ goal, onEdit, toggleEditForm }) => {
    const [name, setName] = useState(goal.name);
    const [description, setDescription] = useState(goal.description);
    const [goalValue, setGoalValue] = useState(goal.targetValue);
    const [unit, setUnit] = useState(goal.unit);
    const [customUnit, setCustomUnit] = useState(false);
    const [deadline, setDeadline] = useState(goal.deadline);

    const onSubmit = (e) => {
        e.preventDefault();
    
        onEdit({ name, description, goalValue, unit, deadline });

        toggleEditForm();
      }

    return (
        <GoalForm 
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            goalValue={goalValue}
            setGoalValue={setGoalValue}
            unit={unit}
            setUnit={setUnit}
            deadline={deadline}
            setDeadline={setDeadline}
            onSubmit={onSubmit}
            buttonText={'UPDATE'}
        />
    )
}

export default GoalEditForm
