import { FaUserLock } from "react-icons/fa"

const Unauthorised = () => {
  return (
    <>
        <div className="container shadow">
            <h1 className="text-center">
                <FaUserLock style={{fontSize: '200px'}}/>
            </h1>
            <h1 className="text-center">Unauthorised</h1>
            
        </div>
    </>
  )
}

export default Unauthorised
