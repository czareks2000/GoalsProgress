import { useField } from "formik";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface Props {
    name: string;
    label?: string;
    defaultValue?: dayjs.Dayjs;
    format?: string;
    views?: DateView[];
}

export default function DateInput(props: Props) {
    const [field, meta, helpers] = useField(props.name!);
    const [styles, setStyles] = useState({
        primaryFontColor: '#fff',
        backgroundDark: '#000',
        primary: '#478559',
        highlight: '#f95d9b',
    });
    
    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setStyles({
            primaryFontColor: rootStyles.getPropertyValue('--primary-font-color').trim(),
            backgroundDark: rootStyles.getPropertyValue('--background-dark').trim(),
            primary: rootStyles.getPropertyValue('--primary').trim(),
            highlight: rootStyles.getPropertyValue('--highlight').trim(),
        });
    }, []);

    return (
        <div>
            <label htmlFor={field.name}>{props.label}</label>
            <DatePicker
                views={props.views || ['year', 'month', 'day']}
                value={field.value || props.defaultValue}
                onChange={(date) => helpers.setValue(date, true)}
                format={props.format || "DD/MM/YYYY"}
                
                slotProps={{
                    textField: {
                        size: 'small',
                        fullWidth: true,
                        error: Boolean(meta.error),
                        helperText: meta.error,
                        name: props.name,
                        onBlur: () => helpers.setTouched(true, true),
                        sx: {
                            color: styles.primaryFontColor,
                            fontSize: 'large',
                            marginTop: '5px',
                            '& .MuiInputBase-root': {
                                color: styles.primaryFontColor,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: styles.primary,
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: styles.highlight,
                                borderWidth: '2px',
                            },
                            '& :hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: styles.highlight,
                                borderWidth: '2px',
                            },
                            '& .MuiSvgIcon-root': {
                                color: styles.primaryFontColor,
                            },
                        }
                    }
                }}
            />
        </div>
    )
}