import { ChangeEvent, useState } from "react"

import { Progress } from "../../../app/models/Progress";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../../common/form/TextInput";
import NumberInput from "../../common/form/NumberInput";
import DateInput from "../../common/form/DateInput";

interface Props {
  toggleAddForm: () => void;
}

const ProgressAddForm = ({ toggleAddForm }: Props) => {
    const {goalStore} = useStore();
    const {createProgress, categories, selectedGoal} = goalStore;

    const initialValues = {
      id: 0,
      value: 
        selectedGoal?.type === GoalType.Standard ? 1 : null,
      date: null,
      description: '',
      categoryId: categories[0].id
    };

    const validationSchema = Yup.object({
      value: Yup.string().required('Value is required'),
      description: 
        selectedGoal?.type === GoalType.Standard 
          ? Yup.string().required('Description is required')
          : Yup.string().notRequired(),
      date: Yup.date().required('Date is required'),
    });

    const onSubmit = (values: Progress) => {
      createProgress(selectedGoal!.id, values);
      toggleAddForm();
    }

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
        {({ errors, touched, isValid, dirty, values, setFieldValue }) => (
          <Form className="outline">
            {/* Value */}
            <NumberInput placeholder="ex. 1" name="value" label="Value"/>

            {/* Description or Category */}
            {selectedGoal?.type === GoalType.Standard 
              ?
              <TextInput placeholder="ex. title of the movie" name="description" label="Description"/>
              :
              <div className="form-control">
                <label htmlFor="categoryId">Category</label>
                <Field
                  as="select"
                  name="categoryId" 
                  id="categoryId"
                  value={values.categoryId} 
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                    setFieldValue('categoryId', parseInt(e.target.value))}>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{`${category.name} (x ${category.multiplier})`}</option>
                  ))}
                </Field>
              </div>
            } 

            {/* Date */}
            <DateInput
              label="Date" 
              name="date"
              placeholderText="Click to select a date"
              todayButton="Today"
              calendarStartDay={1}
              dateFormat="dd MMM yyyy"
            />

            {/* Button */}
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

export default ProgressAddForm
