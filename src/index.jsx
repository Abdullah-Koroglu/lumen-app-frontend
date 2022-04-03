import React , {useState} from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";
import './styles.less';

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function startApp() {
    const theme = accountService.userValue?.color
    render(
        <Router history={history}>
            <ThemeProvider theme={theme == '1' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <StyledApp>
                    <App />
                </StyledApp>
            </ThemeProvider>
        </Router>,
        document.getElementById('app')
    );
}