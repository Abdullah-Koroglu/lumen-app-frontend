import React from 'react';

import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user?.firstName}!</h1>
                {user?.firstName ? <p>You're logged in with React & JWT!!</p> : 
                <p>You can login by clicking the login button.</p>}
            </div>
        </div>
    );
}

export { Home };