import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar container shadow text-center">
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
    )
}

export default Navbar
