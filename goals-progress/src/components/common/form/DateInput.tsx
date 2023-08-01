import { ErrorMessage, useField } from "formik";
import DatePicker, {ReactDatePickerProps} from "react-datepicker"

interface Props extends Partial<ReactDatePickerProps> {
    label: string;
}

export default function DateInput(props: Props) {
    const [field, meta, helpers] = useField(props.name!);
    return (
        <div className="form-control">
            <label>{props.label}</label>
            <DatePicker
                {...field}
                {...props}
                autoComplete='off'
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
                className={`date-input ${meta.touched && meta.error ? 
                    "error" : ""}`}
            />
            <ErrorMessage name={props.name} component="span" className="error"/>
        </div>
    )
}