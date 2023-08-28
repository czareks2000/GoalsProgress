import { NavLink } from 'react-router-dom'
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function Navbar() {
    const {userStore: {logout}} = useStore();
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
                <div className="navbar-item" onClick={logout}>
                    Logout
                </div>
            </div>
        </div>
    )
})
