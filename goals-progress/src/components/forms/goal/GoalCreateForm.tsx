import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom";

import GoalForm from "./GoalForm";
import { Goal } from "../../../app/models/Goal";
import { GoalType } from "../../../app/models/enums/GoalType";
import { useStore } from "../../../app/stores/store";

interface Props {
  type: GoalType;
  setType: Dispatch<SetStateAction<GoalType | null>>;
}

const GoalCreateForm = ({type, setType}: Props) => {
  const {goalStore} = useStore();
  const {createGoal} = goalStore
     
  const [goal, setGoal] = useState<Goal>({
    id: 0,
    name: '',
    description: '',
    currentValue: 0,
    targetValue: null,
    customUnit: false,
    unit: '',
    deadline: null,
    status: 1,
    type: type
  });

  const navigate = useNavigate();

  const submitForm = (goal: Goal) => {
    createGoal(goal).then(() => navigate(`/goals`));
  }

  return (
      <GoalForm 
        goal={goal}
        setGoal={setGoal}
        onSubmit={submitForm}
        buttonText={'CREATE'}
        cancelButton={true}
        cancelButtonAction={() => setType(null)}
      />
  )
}

export default GoalCreateForm
