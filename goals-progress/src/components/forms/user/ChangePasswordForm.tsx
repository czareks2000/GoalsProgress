import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../common/form/TextInput";
import Button from "../../common/Button";

export default observer(function ChangePasswordForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
                error: null
            }}
            onSubmit={async (values, {setErrors, resetForm}) => {
                try {
                    await userStore.changePassword(values);
                    resetForm();
                } catch (error) {
                    setErrors({error: error as string});
                }
            }
                
            }
            validationSchema={Yup.object({
                currentPassword: Yup.string().required('Current password is required'),
                newPassword: Yup.string().required('New password is required'),
                confirmNewPassword: Yup.string().required('Confirm password')
                    .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.')
            })}
        >
        {({handleSubmit, isSubmitting, isValid, dirty}) => (
            <Form
                className="form"
                style={{marginTop: 30}} 
                onSubmit={handleSubmit} 
                autoComplete="off"
            >   
                <h2 className="text-center">Change password</h2>

                <TextInput placeholder="Enter your password" name="currentPassword" type="password" label="Current password"/>
                <TextInput placeholder="Enter new password" name="newPassword" type="password" label="New password"/>
                <TextInput placeholder="Confirm password" name="confirmNewPassword" type="password"/>

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
                        text={"Change"}
                    />
                </div>
            </Form>
        )}    
        </Formik>
    )
})