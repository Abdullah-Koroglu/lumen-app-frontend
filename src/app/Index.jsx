import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../theme";


function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});
    const [color, setColor] = useState(2);

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    useEffect(()=>{
        setColor(accountService.userValue?.color)
    }, [accountService.userValue?.color])

    return (
        <ThemeProvider theme={color == '1' ? lightTheme : darkTheme}>
            <GlobalStyles />
            {/* <StyledApp> */}
                <div className={'app-container'}>
                    <Nav />
                    <Alert />
                    <Switch>
                        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                        <Route exact path="/" component={Home} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                        <Route path="/account" component={Account} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            {/* </StyledApp> */}
        </ThemeProvider>
    );
}

export { App }; 