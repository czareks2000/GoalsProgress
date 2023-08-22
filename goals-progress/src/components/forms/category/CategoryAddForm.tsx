import { Form, Formik } from "formik";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import TextInput from "../../common/form/TextInput";
import NumberInput from "../../common/form/NumberInput";
import { Category } from "../../../app/models/Category";
import Button from "../../common/Button";
import { useState } from "react";

const CategoryAddForm = () => {
    const {goalStore} = useStore();
    const {selectedGoal: goal, createCategory} = goalStore;

    const [loading, setLoading] = useState(false);
    
    const initialValues = {
        id: 0,
        name: '',
        multiplier: null
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        multiplier: Yup.number()
            .positive('Multiplier must be positive number')
            .required('Multiplier is required')
      });

    const onSubmit = async (values: Category, { resetForm }: any) => {
        setLoading(true);
        await createCategory(goal?.id as number, values);
        setLoading(false);
        resetForm();
    }

    return (
    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {({ isValid, dirty, isSubmitting }) => (
            <Form className="form outline outline-primary">
                <TextInput name="name" placeholder="ex. Running" label="Category Name"/>
                <NumberInput name="multiplier" placeholder="ex. 1.5" label="Multiplier"/>
                <div className="text-center">
                    <Button
                        loading={loading}
                        type="submit"
                        className={!(dirty && isValid) ? "btn disabled" : "btn"}
                        disabled={!(dirty && isValid) || isSubmitting}
                        text={<>ADD</>}
                    />
                </div>
            </Form>
        )}
        </Formik>
    </>
  )
}

export default CategoryAddForm
