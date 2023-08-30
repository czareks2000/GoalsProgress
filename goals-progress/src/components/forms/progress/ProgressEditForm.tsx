import { Progress } from "../../../app/models/Progress"
import { useStore } from "../../../app/stores/store";
import ProgressForm from "./ProgressForm"

const ProgressEditForm = () => {
    const {
        goalStore: {updateProgress}, 
        detailsPageStore: {toggleEditProgressForm, selectedProgress}
    } = useStore();

    const submitForm = async (progress: Progress) => {
        await updateProgress(progress);
        toggleEditProgressForm();
    }

    const initialValues = {
        ...selectedProgress, categoryId: selectedProgress?.category?.id
    }

    return (
        <>
            <ProgressForm 
            onSubmit={submitForm}
            buttonText="UPDATE"
            progress={initialValues as Progress}
            cancelButton={true}
            cancelButtonAction={toggleEditProgressForm}
            />
        </>
    )
}

export default ProgressEditForm
