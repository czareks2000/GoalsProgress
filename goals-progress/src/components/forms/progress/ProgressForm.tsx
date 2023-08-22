import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import * as Yup from "yup";
import { Progress } from "../../../app/models/Progress";
import { ChangeEvent, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import NumberInput from "../../common/form/NumberInput";
import TextInput from "../../common/form/TextInput";
import DateInput from "../../common/form/DateInput";
import Button from "../../common/Button";

interface Props {
    onSubmit: (progress: Progress) => void;
    buttonText: string;
    progress: Progress;
    cancelButton?: boolean;
    cancelButtonAction?: any;
}

export default observer(function ProgressForm(
    {onSubmit, buttonText, progress, cancelButton = false, cancelButtonAction}: Props) {
    const {goalStore} = useStore();
    const {selectedCategories: categories, selectedGoal,
        idOfLastCreatedCategory, loading} = goalStore;

    const validationSchema = Yup.object({
      value: Yup.number()
        .positive("Value must be positive number")
        .required('Value is required'),
      description: 
        selectedGoal?.type === GoalType.Standard 
          ? Yup.string().required('Description is required')
          : Yup.string().notRequired(),
      date: Yup.date().required('Date is required'),
    });

    var updateField: any;
    useEffect(()=> {
        if(idOfLastCreatedCategory)
          updateField('categoryId', idOfLastCreatedCategory);
    }, [idOfLastCreatedCategory, updateField]);

    return (
      <>
        <Formik
          initialValues={progress}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
        {({ isValid, dirty, values, setFieldValue, isSubmitting }) => {
          updateField = setFieldValue;
          return(
          <Form className="form outline outline-primary">
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
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('categoryId', parseInt(e.target.value));
                  }}>
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
              <Button
                loading={loading}
                type="submit"
                className={!(dirty && isValid) ? "btn disabled" : "btn"}
                disabled={!(dirty && isValid) || isSubmitting}
                text={buttonText}
              />
              {cancelButton &&
                  <div
                    className="btn"
                    onClick={cancelButtonAction}
                  >
                    CANCEL
                  </div> 
                }
            </div>

          </Form>
          )
        }}
        </Formik>
      </>
  )
})

