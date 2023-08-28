import { Link } from "react-router-dom";
import Button from "../common/Button";
import LoginForm from "../forms/user/LoginForm";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import RegisterForm from "../forms/user/RegisterForm";

export default observer(function HomePage() {
    const {userStore} = useStore();

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const hideForms = () => {
        setShowRegisterForm(false);
        setShowLoginForm(false);
    }

    return (
        <>
            <div className="container center">
                {userStore.isLoggedIn ?
                    <div className="outline outline-primary">
                        <h1 className="text-center">Welcome to GoalsProgress</h1>
                        <Link className="text-center" to='/goals'>
                            <Button text={"Go to your goals"} />
                        </Link>
                    </div> 
                :
                    <>
                        {showLoginForm && <LoginForm cancelButtonAction={hideForms}/>}
                        {showRegisterForm && <RegisterForm cancelButtonAction={hideForms}/>}
                        {!(showLoginForm || showRegisterForm) && 
                        <div className="outline outline-primary">
                            <h1 className="text-center">Welcome to GoalsProgress</h1>
                            <div className="text-center my-1">
                                <Button text={"Login"} onClick={() => setShowLoginForm(true)}/>
                                <Button text={"Register"} onClick={() => setShowRegisterForm(true)}/>
                            </div>
                        </div>
                        }
                    </>
                }
            </div>
        </>
    )
})