import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'

const Actions = ({ onShowAddForm, showAddForm }) => {
    return (
        <div className="actions text-center">
            <div className={`action ${showAddForm ? 'active' : ''}`} onClick={onShowAddForm}>
                {showAddForm ? 
                <><GiCancel/>Cancel</>
                : 
                <><FaPlus/>Progress</> 
                }
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
