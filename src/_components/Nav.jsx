import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
    const [user, setUser] = useState({});
    const [popupVisible, setPopup] = useState(false);

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    // if (!user) return null;

    const popup = () =>{
        return (
            <>
                <div className='popup-back'>
                </div>
                <div className='popup-container'>
                    <h5 className='popup-text'>Do you want to logout safely?</h5>
                    <div className='row popup-row'>
                        <button onClick={(e)=>{
                            setPopup(false)
                            accountService.logout(e)
                            }} className="btn btn-primary mr-2">
                            Logout
                        </button>
                        <button onClick={()=>{setPopup(false)}} className="btn btn-primary mr-2">
                            Cancel
                        </button>
                    </div>
                </div></>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    {user && <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>}
                    {user?.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }
                    {user ? 
                    <a onClick={()=>{setPopup(true)}} className="nav-item nav-link">Logout</a> : 
                    <NavLink to="/account/login" className="nav-item nav-link">Login</NavLink>}
                    {popupVisible && popup()}
                </div>
            </nav>
            {/* <Route path="/admin" component={AdminNav} /> */}
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 