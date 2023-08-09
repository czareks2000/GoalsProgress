import { Progress } from "../../../app/models/Progress";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import { observer } from "mobx-react-lite";
import ProgressForm from "./ProgressForm";

export default observer(function ProgressAddForm() {
    const {goalStore} = useStore();
    const {createProgress, selectedCategories: categories,
      selectedGoal, toggleAddProgressForm} = goalStore;

    const initialValues = {
      id: 0,
      value: 
        selectedGoal?.type === GoalType.Standard ? 1 : null,
      date: null,
      description: '',
      categoryId: 
        selectedGoal?.type === GoalType.Extended ? categories[0].id : undefined
    };

    const submitForm = (values: Progress) => {
      createProgress(selectedGoal!.id, values);
      toggleAddProgressForm();
    }

    return (
      <>
        <ProgressForm 
          onSubmit={submitForm}
          buttonText="ADD"
          progress={initialValues}
        />
      </>
  )
})
