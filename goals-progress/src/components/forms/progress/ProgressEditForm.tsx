import { Progress, ProgressFormValues } from "../../../app/models/Progress"
import { useStore } from "../../../app/stores/store";
import ProgressForm from "./ProgressForm"

const ProgressEditForm = () => {
    const {
        goalStore: {updateProgress}, 
        detailsPageStore: {toggleEditProgressForm, selectedProgress}
    } = useStore();

    const submitForm = async (progress: ProgressFormValues) => {
        await updateProgress(progress as Progress);
        toggleEditProgressForm();
    }

    const initialValues = {
        ...selectedProgress, categoryId: selectedProgress?.category?.id
    }

    return (
        <>
            <ProgressForm 
            onSubmit={submitForm}
            buttonText="Update"
            progress={initialValues as ProgressFormValues}
            cancelButton={true}
            cancelButtonAction={toggleEditProgressForm}
            />
        </>
    )
}

export default ProgressEditForm
