import { useState } from "react"
import { useNavigate } from "react-router-dom";

import GoalForm from "./GoalForm";

const GoalCreateForm = ({ onAdd }) => { 
  const [goal, setGoal] = useState({
    id: null,
    name: '',
    description: '',
    currentValue: 0,
    targetValue: '',
    customUnit: false,
    unit: '',
    progress: 0,
    deadline: ''
  });

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd(goal);

    navigate("/");
  }

  return (
    <div className="container shadow">
      <GoalForm 
        goal={goal}
        setGoal={setGoal}
        onSubmit={onSubmit}
        buttonText={'ADD'}
      />
    </div>
  )
}

export default GoalCreateForm
