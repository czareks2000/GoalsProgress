import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    return (
        <div className="navbar container shadow text-center">
            <Link 
                className={`navbar-item ${(location.pathname === '/goals' || location.pathname === '/') && 'active'}`} 
                to="/goals"
            >
                Goals
            </Link>
            <Link 
                className={`navbar-item ${location.pathname === '/archived' && 'active'}`} 
                to="/archived"
            >
                Archived
            </Link>       
            <Link 
                className={`navbar-item ${location.pathname === '/settings' && 'active'}`}  
                to="/settings"
            >
                Settings
            </Link>
            <div className="navbar-item">
                Logout
            </div>
        </div>
    )
}

export default Navbar
