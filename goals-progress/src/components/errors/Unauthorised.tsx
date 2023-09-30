import { FaUserLock } from "react-icons/fa"
import Button from "../common/Button"
import { Link } from "react-router-dom"
import { useStore } from "../../app/stores/store";

const Unauthorised = () => {
  const {userStore} = useStore();

  return (
    <>
        <div className="errors container shadow">
            <h1 className="text-center">
                <FaUserLock style={{fontSize: '200px'}}/>
            </h1>
            <h1 className="text-center">Unauthorised</h1>
            
            <p className="text-center">
              <Link to='/'>
                <Button text="Sign in" onClick={() => userStore.logout()}/>
              </Link>
            </p>
        </div>
    </>
  )
}

export default Unauthorised
