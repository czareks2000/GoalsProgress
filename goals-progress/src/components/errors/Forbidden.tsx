import { RiFolderForbidFill } from "react-icons/ri"

const Forbidden = () => {
  return (
    <>
        <div className="container shadow">
            <h1 className="text-center">
                <RiFolderForbidFill style={{fontSize: '200px'}}/>
            </h1>
            <h1 className="text-center">Forbidden</h1>
            
        </div>
    </>
  )
}

export default Forbidden
