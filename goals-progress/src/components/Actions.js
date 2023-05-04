import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'

const Actions = () => {
  
    return (
        <div className="actions text-center">
            <div className="action">
                <FaPlus/>
                Progress
            </div>
            <div className="action">
                <FaEdit/>
                Edit
            </div>
            <div className="action">
                <FaTrash/>
                Delete
            </div>
            <div className="action">
                <FaFolder/>
                Archive
            </div>
        </div>
  )
}

export default Actions
