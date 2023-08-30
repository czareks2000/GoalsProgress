import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../common/form/TextInput";
import Button from "../../common/Button";

interface Props {
    cancelButtonAction: () => void;
}

export default observer(function LoginForm({cancelButtonAction}: Props) {
    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => 
                userStore.login(values).catch(() =>
                    setErrors({error: 'Invalid email or password'}))
            }   
        >
            {({handleSubmit, isSubmitting}) => (
                <Form 
                    className="form outline outline-primary" 
                    onSubmit={handleSubmit} 
                    autoComplete="off"
                >
                    <h1 className="text-center">Login to GoalsProgress</h1>
                    
                    <TextInput placeholder="Email" name="email" />
                    <TextInput placeholder="Password" name="password" 
                         type="password"/>

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
                            disabled={isSubmitting}
                            text={"LOGIN"}
                        />
                        <div
                            className="btn"
                            onClick={cancelButtonAction}
                        >
                            CANCEL
                        </div> 
                    </div>
                </Form>
            )}
        </Formik>
    )
})