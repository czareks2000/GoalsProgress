import { ChangeEvent } from "react";
import { Goal } from "../../../app/models/Goal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DateInput from "../../common/form/DateInput";
import TextInput from "../../common/form/TextInput";

interface Props {
  onSubmit: (goal: Goal) => void;
  buttonText: string;
  goal: Goal;
  setGoal: (goal: Goal) => void;
  cancelButton?: boolean;
  cancelButtonAction?: any;
}

const GoalForm = ({ onSubmit, buttonText, goal, setGoal, cancelButton = false, cancelButtonAction }: Props) => {

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('The goal name is required'),
      description: Yup.string().required('The goal description is required'),
      targetValue: Yup.number().required('The goal value is required'),
      deadline: Yup.date().required('The goal deadline is required'),
      customUnit: Yup.boolean(),
      unit: Yup.string().notRequired()
    });

    return (
      <Formik
        initialValues={goal}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit(values)}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty, values } = formik;
          return (
              <Form className="goal-form outline">
                {/* Name */}
                <TextInput placeholder="ex. Reading Books" name="name" label="Name"/>

                {/* Description */}
                <TextInput placeholder="ex. Read 10 books" name="description" label="Description"/>

                <div className="form-group-inline">
                  {/* Goal Value and optional unit select*/}
                  <div className="form-control w-100">
                    <label htmlFor="targetValue">Goal Value</label>
                    <Field
                      type="number"
                      name="targetValue"
                      id="targetValue"
                      placeholder="ex. 10"
                      value={values.targetValue == null ? '' : values.targetValue}
                      className={errors.targetValue && touched.targetValue ? 
                        "error" : ""}
                    />
                  </div>

                  {/* Custom unit select*/}
                  <div className="form-control">
                      <label htmlFor="customUnit">Unit</label>
                      <Field 
                        as="select" 
                        name="customUnit" 
                        id="customUnit" 
                        value={values.customUnit.toString()}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          const selectedValue = e.target.value;
                          formik.setFieldValue('customUnit', selectedValue === 'true');
                          if (selectedValue === 'false')
                            formik.setFieldValue('unit', '');
                        }}
                      >
                        <option value="false">none</option>
                        <option value="true">custom</option>
                      </Field>
                  </div>
                </div>
                <ErrorMessage name="targetValue" component="span" className="error"/>

                {/* Custom unit input*/}
                {values.customUnit &&
                  <TextInput placeholder="ex. meters or m" name="unit" label="Custom Unit"/>
                }

                {/* Deadline */}
                <DateInput
                  label="Deadline" 
                  name="deadline"
                  placeholderText="Click to select a date"
                  todayButton="Today"
                  calendarStartDay={1}
                  dateFormat="dd MMM yyyy"
                />

                {/* Buttons */}
                <div className="text-center">
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? "btn disabled" : "btn"}
                    disabled={!(dirty && isValid) }
                  >
                    {buttonText}
                  </button>
                  {cancelButton &&
                  <div
                    className="btn"
                    style={{backgroundColor: '#39a0ca'}}
                    onClick={cancelButtonAction}
                  >
                    CANCEL
                  </div> 
                  }
                </div>
              </Form>
          );
        }}
      </Formik>
  )
}

export default GoalForm
