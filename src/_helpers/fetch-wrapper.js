import config from 'config';
import { accountService } from '@/_services';
import fetch from 'cross-fetch';

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
}

function get(url, withCredentials) {
    let credentials = {}
    if (withCredentials) {
        let token = getRefreshToken();
        credentials = {
            'Authorization': `Bearer ${token}`
        }
    }
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(url), ...credentials},
        credentials: 'same-origin',
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, withCredentials) {
    let credentials = {}
    if (withCredentials) {
        let token = getRefreshToken();
        credentials = {
            'Authorization': `Bearer ${token}`
        }
    }

const requestOptions = {
        method: 'POST',
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           ...credentials
        },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getRefreshToken() {
    // get refresh token from cookie
    return (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
}