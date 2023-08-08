import { Form, Formik } from "formik";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import TextInput from "../../common/form/TextInput";
import NumberInput from "../../common/form/NumberInput";
import { Category } from "../../../app/models/Category";

const CategoryAddForm = () => {
    const {goalStore} = useStore();
    const {selectedGoal: goal, createCategory} = goalStore;
    
    const initialValues = {
        id: 0,
        name: '',
        multiplier: null
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        multiplier: Yup.number().required('Multiplier is required')
      });

    const onSubmit = (values: Category, { resetForm }: any) => {
        createCategory(goal?.id as number, values);
        resetForm();
    }

    return (
    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {({ isValid, dirty }) => (
            <Form className="form outline outline-primary">
                <TextInput name="name" placeholder="ex. Running" label="Category Name"/>
                <NumberInput name="multiplier" placeholder="ex. 1.5" label="Multiplier"/>
                <div className="text-center">
                    <button
                        type="submit"
                        className={!(dirty && isValid) ? "btn disabled" : "btn"}
                        disabled={!(dirty && isValid) }
                    >
                        ADD
                    </button>
                </div>
            </Form>
        )}
        </Formik>
    </>
  )
}

export default CategoryAddForm
