import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <div className='manage-button'>
            <p style={{margin: 0}}><Link to={`${path}/users`}>Manage Users</Link></p>
            </div>
        </div>
    );
}

export { Overview };