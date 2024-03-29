import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "../../common/form/TextInput";
import Button from "../../common/Button";

interface Props {
    cancelButtonAction: () => void;
}

export default observer(function RegisterForm({cancelButtonAction}: Props) {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{userName: '', email: '', password: '', confirmPassword: '', error: null}}
            onSubmit={(values, {setErrors}) => 
                userStore.register(values).catch(error => 
                    setErrors({error}))        
            }
            validationSchema={Yup.object({
                userName: Yup.string().required('Username is required'),
                email: Yup.string().required('Email is required'),
                password: Yup.string().required('Password is required'),
                confirmPassword: Yup.string().required('Confirm password')
                    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
            })}
        >
            {({handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form
                    className="form outline outline-primary" 
                    onSubmit={handleSubmit} 
                    autoComplete="off"
                >
                    <h1 className="text-center">Sign up to GoalsProgress</h1>
                    
                    <TextInput placeholder="Username" name="userName" />
                    <TextInput placeholder="Email" name="email"/>
                    <TextInput placeholder="Password" name="password" type="password"/>
                    <TextInput placeholder="Confirm Password" name="confirmPassword" type="password"/>

                    <div className="my-1">
                        <ErrorMessage 
                            name="error"
                            className="error"
                            component="span"
                        />
                    </div>
                    
                    <div className="text-center my-1">
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            className={!(dirty && isValid) ? "btn disabled" : "btn"}
                            disabled={!isValid || !dirty || isSubmitting}
                            text={"Sign up"}
                        />
                        <div
                            className="btn"
                            onClick={cancelButtonAction}
                        >
                            Cancel
                        </div> 
                    </div>
                </Form>
            )}
        </Formik>
    )
})