import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

import GoalForm from "./GoalForm";
import { Goal } from "../interfaces/GoalInterface";

interface Props {
  onAdd: (goal: Goal) => void;
}

const GoalCreateForm = ({ onAdd }: Props) => { 
  const [goal, setGoal] = useState<Goal>({
    id: 0,
    name: '',
    description: '',
    currentValue: 0,
    targetValue: 0,
    customUnit: false,
    unit: '',
    deadline: '',
    status: 1
  });

  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * (100 - 10 + 1)) + 10 // tylko do testowania
    onAdd({ ...goal, id: id});

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
