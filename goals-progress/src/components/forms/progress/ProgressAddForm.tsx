import { ChangeEvent, useEffect } from "react"

import { Progress } from "../../../app/models/Progress";
import { useStore } from "../../../app/stores/store";
import { GoalType } from "../../../app/models/enums/GoalType";
import { Formik, Form, Field,} from "formik";
import * as Yup from "yup";
import TextInput from "../../common/form/TextInput";
import NumberInput from "../../common/form/NumberInput";
import DateInput from "../../common/form/DateInput";
import { observer } from "mobx-react-lite";

export default observer(function ProgressAddForm() {
    const {goalStore, detailsPageStore} = useStore();
    const {createProgress, selectedCategories: categories, 
      selectedGoal, idOfLastCreatedCategory} = goalStore;
    const {toggleAddForm} = detailsPageStore;

    const initialValues = {
      id: 0,
      value: 
        selectedGoal?.type === GoalType.Standard ? 1 : null,
      date: null,
      description: '',
      categoryId: 
        selectedGoal?.type === GoalType.Extended ? categories[0].id : undefined
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

    var updateField: any;
    useEffect(()=> {
        if(idOfLastCreatedCategory)
          updateField('categoryId', idOfLastCreatedCategory);
    }, [idOfLastCreatedCategory, updateField]);

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
        {({ isValid, dirty, values, setFieldValue }) => {
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
              <button
                type="submit"
                className={!(dirty && isValid) ? "btn disabled" : "btn"}
                disabled={!(dirty && isValid) }
              >
                ADD
              </button>
            </div>

          </Form>
          )
        }}
        </Formik>
      </>
  )
})
