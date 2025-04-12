import { Progress, ProgressFormValues } from "../../../app/models/Progress";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import { observer } from "mobx-react-lite";
import ProgressForm from "./ProgressForm";
import dayjs from "dayjs";

export default observer(function ProgressAddForm() {
    const {goalStore, detailsPageStore: {toggleAddProgressForm}} = useStore();
    const {createProgress, selectedGoal} = goalStore;

    const initialValues: ProgressFormValues = {
      id: 0,
      value: 
        selectedGoal?.type === GoalType.Standard ? 1 : null,
      date: dayjs(),
      description: '',
      categoryId: 
        selectedGoal?.type === GoalType.Extended ? selectedGoal.categories![0].id : undefined
    };

    const submitForm = async (values: ProgressFormValues) => {
      await createProgress(selectedGoal!.id, values as Progress);
      toggleAddProgressForm();
    }

    return (
      <>
        <ProgressForm 
          onSubmit={submitForm}
          buttonText="Add"
          progress={initialValues}
        />
      </>
  )
})
