import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;
// const newBaseUrl = `http://localhost:8000`;
const newBaseUrl = `https://lumen-test-ins.herokuapp.com`;


export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    verifyEmail,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function login(email, password) {
return  fetchWrapper.post(`${newBaseUrl}/api/login`, { email, password })
        .then(user => {
            setRefreshToken(user.jwtToken, user.expires_in)
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });


}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${newBaseUrl}/api/logout`, {}, true)
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        stopRefreshTokenTimer();
        userSubject.next(null);
        history.push('/account/login');
}

function refreshToken() {
    let refreshToken = getRefreshToken()
    return fetchWrapper.post(`${newBaseUrl}/api/refresh-token`, {token: refreshToken})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function register(params) {
    return fetchWrapper.post(`${newBaseUrl}/api/register`, params).then((user)=>{
        userSubject.next(user);
        startRefreshTokenTimer();
    });
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
}

function getAll() {
    return fetchWrapper.get(`${newBaseUrl}/api/accounts`, true);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(params) {
    return fetchWrapper.post(`${newBaseUrl}/api/update-user`, params, true)
        .then(user => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = { ...userSubject.value, ...user };
                userSubject.next(user);
            }
            return user;
        });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}


function setRefreshToken(token, expires_in) {
    // add token cookie that expires in 7 days
    const expires = new Date(Date.now() + expires_in*1000).toUTCString();
    document.cookie = `refreshToken=${token}; expires=${expires}; path=/`;

    return token;
}

function getRefreshToken() {
    // get refresh token from cookie
    return (document.cookie.split(';').find(x => x.includes('refreshToken')) || '=').split('=')[1];
}