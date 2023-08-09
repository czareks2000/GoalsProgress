import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='container shadow'>
            <div className="navbar text-center">
                <NavLink className={`navbar-item`} to="/goals">
                    Goals
                </NavLink>
                <NavLink className={`navbar-item`} to="/archived">
                    Archived
                </NavLink>       
                <NavLink  className={`navbar-item`} to="/settings">
                    Settings
                </NavLink>
                <div className="navbar-item">
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar
