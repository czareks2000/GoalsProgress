import { ChangeEvent } from "react";
import { Goal } from "../../../app/models/Goal";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import DateInput from "../../common/form/DateInput";
import TextInput from "../../common/form/TextInput";
import Button from "../../common/Button";
import { observer } from "mobx-react-lite";
import dayjs from "dayjs";

interface Props {
  onSubmit: (goal: Goal) => void;
  buttonText: string;
  goal: Goal;
  cancelButton?: boolean;
  cancelButtonAction?: () => void;
}

export default observer(function GoalForm({ onSubmit, buttonText, goal, cancelButton = false, cancelButtonAction }: Props) {
    const validationSchema = Yup.object({
      name: Yup.string().required('The goal name is required'),
      description: Yup.string().required('The goal description is required'),
      targetValue: Yup.number()
        .positive("Goal value must be positive number")
        .required('The goal value is required'),
      deadline: Yup.string().required('The goal deadline is required'),
      customUnit: Yup.boolean(),
      unit: Yup.string().notRequired()
    });

    const handleCustomUnitOption = (formik: FormikProps<Goal>, selectedValue: string) => {
        formik.setFieldValue('customUnit', selectedValue === 'true');
        if (selectedValue === 'false')
          formik.setFieldValue('unit', '');
    }

    return (
      <Formik
        initialValues={goal}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit(values)}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty, values, isSubmitting } = formik;
          return (
              <Form className="form outline outline-primary">
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
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                          handleCustomUnitOption(formik, e.target.value)}
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
                  defaultValue={dayjs().endOf('year')}
                />

                {/* Buttons */}
                <div className="text-center">
                  <Button
                    loading={isSubmitting} 
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
                    Cancel
                  </div> 
                  }
                </div>
              </Form>
          );
        }}
      </Formik>
  )
})
