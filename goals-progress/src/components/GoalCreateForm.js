import { useState } from "react"
import { useNavigate } from "react-router-dom";

import GoalForm from "./GoalForm";

const GoalCreateForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [unit, setUnit] = useState('none');
  const [customUnit, setCustomUnit] = useState(false);
  const [deadline, setDeadline] = useState('');
  
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ name, description, goalValue, unit, deadline });

    navigate("/");
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
      customUnit={customUnit}
      setCustomUnit={setCustomUnit}
      deadline={deadline}
      setDeadline={setDeadline}
      onSubmit={onSubmit}
      buttonText={'ADD'}
    />
  )
}

export default GoalCreateForm
