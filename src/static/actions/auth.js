import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,

    AUTH_LOGOUT_USER,

    AUTH_SIGNUP_USER_REQUEST,
    AUTH_SIGNUP_USER_FAILURE,
    AUTH_SIGNUP_USER_SUCCESS,

    AUTH_VALIDATE_REQUEST,
    AUTH_VALIDATE_SUCCESS,
    AUTH_VALIDATE_FAILURE,

    AUTH_VALIDATE_RESEND_REQUEST,
    AUTH_VALIDATE_RESEND_SUCCESS,
    AUTH_VALIDATE_RESEND_FAILURE,

    AUTH_SETUP_FORM_CHANGE,
    AUTH_UPDATE_USER_REQUEST,
    AUTH_UPDATE_USER_SUCCESS,
    AUTH_UPDATE_USER_FAILURE

} from '../constants';

import { dataFilterEntries } from './data';
import { changeDate } from './menu';
/// Login actions ///
// [in order]
// authLoginUser, authLoginUserRequest, authLoginUserFailure, authLoginUserSuccess
export function authLoginUser(username, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${username}:${password}`);
        return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authLoginUserSuccess(response.token, response.user));
                dispatch(dataFilterEntries(new Date(), response.user.food_entries));
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user
        }
    };
}
/// end login actions ///

/// logout ///
export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: AUTH_LOGOUT_USER
    };
}
/// end logout ///

/// signup ///
export function authSignUpUser(username, phone_number, password, redirect = '/') {
  return (dispatch) => {
    dispatch(authSignUpUserRequest());
    return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: `${username}`,
        phone_number: `${phone_number}`,
        password: `${password}`,
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(authSignUpUserSuccess());
        dispatch(authLoginUser(username, password, redirect));
        //log user in after signup
      })
      .catch((error) => {
          if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
              // Invalid authentication credentials
              return error.response.json().then((data) => {
                  // get first key value of respose and send it to function
                  dispatch(authSignUpUserFailure(400, data[Object.keys(data)[0]] ));
              });
          } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
              // Server side error
              dispatch(authSignUpUserFailure(500, 'A server error occurred while sending your data!'));
          } else {
              // Most likely connection issues
              dispatch(authSignUpUserFailure('Connection Error', 'An error occurred while sending your data!'));
          }

          return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  }
}

export function authSignUpUserRequest() {
  return {
    type: AUTH_SIGNUP_USER_REQUEST
  };
}

export function authSignUpUserFailure(error, message) {
  sessionStorage.removeItem('token');
  return {
    type: AUTH_SIGNUP_USER_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function authSignUpUserSuccess() {
  return {
    type: AUTH_SIGNUP_USER_SUCCESS
  };
}

/// end signup ///

/// key validation ///
export function authValidation(token, key, redirect="/signup/setup") {
  return (dispatch, state) => {
    dispatch(authvalidationrequest());
    return fetch(`${SERVER_URL}/api/v1/accounts/validate/`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        phone_validation_key: `${key}`
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(authValidationSuccess('Phone number successfully validated'));
        dispatch(push(redirect));
      })
      .catch((error) => {
          if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
              // Invalid authentication credentials
              return error.response.json().then((data) => {
                  dispatch(authValidationFailure(400, data[Object.keys(data)[0]] ));
                  //dispatch(push('/login'));
              });
          } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
              // Server side error
              dispatch(authValidationFailure(500, 'A server error occurred while sending your data!'));
          } else {
              // Most likely connection issues
              dispatch(authValidationFailure('Connection Error', 'An error occurred while sending your data!'));
          }

          //dispatch(push('/login'));
          return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  }
}

export function authvalidationrequest() {
  return {
    type: AUTH_VALIDATE_REQUEST
  };
}

export function authValidationFailure(error, message) {
  return {
    type: AUTH_VALIDATE_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function authValidationSuccess(message) {
  return {
    type: AUTH_VALIDATE_SUCCESS,
    payload: {
      statusText: message
    }
  };
}

/// validation resend token ///
export function authResendValidationKey(token) {
    return (dispatch, state) => {
        dispatch(authResendValidationKeyRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/validate/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authResendValidationKeySuccess(response.status));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authResendValidationKeyFailure(400, data[Object.keys(data)[0]]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authResendValidationKeyFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authResendValidationKeyFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function authResendValidationKeyRequest() {
  return {
    type: AUTH_VALIDATE_RESEND_REQUEST
  };
}

//TODO fix type
export function authResendValidationKeyFailure(error, message) {
  return {
    type: AUTH_SIGNUP_USER_FAILURE,
    payload: {
      status: error,
      statusText: message
    }
  };
}

export function authResendValidationKeySuccess(message) {
  return {
    type: AUTH_VALIDATE_RESEND_SUCCESS,
    payload: {
      statusText: message
    }
  };
}

// Setup form change
export function authSetupFormChange(target, value){
  return {
    type: AUTH_SETUP_FORM_CHANGE,
    payload: {
      target: target,
      value: value
    }
  };
}

//setup form submit
export function authSetupFormSubmit(token, form, username, phone_number, redirect = "/") {
  return (dispatch, state) => {
    return fetch(`${SERVER_URL}/api/v1/accounts/detail/`, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        username: `${username}`,
        phone_number: `${phone_number}`,
        current_weight: `${form.current_weight}`,
        start_weight: `${form.current_weight}`,
        target_weight: `${form.target_weight}`,
        target_calories: `${form.target_calories}`,
        target_carbohydrate: `${form.target_carbohydrate}`,
        target_protein: `${form.target_protein}`,
        target_fat: `${form.target_fat}`
      })
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
        dispatch(authUpdateUserSuccess(response));
        dispatch(push(redirect));
    })
    .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
            // Invalid authentication credentials
            return error.response.json().then((data) => {
                dispatch(authUpdateUserFailure(data[Object.keys(data)[0]]));
                dispatch(push("/signup/setup"))
            });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
            // Server side error
            dispatch(authUpdateUserFailure('A server error occurred while sending your data!'));
            dispatch(push("/signup/setup"))
        } else {
            // Most likely connection issues
            dispatch(authUpdateUserFailure('Connection Error', 'An error occurred while sending your data!'));
            dispatch(push("/signup/setup"))
        }
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    });
  };
}

// Setup form change success
export function authUpdateUserSuccess(user){
  sessionStorage.setItem('user', JSON.stringify(user));
  return {
    type: AUTH_UPDATE_USER_SUCCESS,
    payload: {
      user: user
    }
  };
}

// Setup form change failure
export function authUpdateUserFailure(statusText){
  return {
    type: AUTH_UPDATE_USER_FAILURE,
    payload: {
      statusText: statusText
    }
  }
}

//reload user
export function authReloadUser(token) {
  return (dispatch, state) => {
    return fetch(`${SERVER_URL}/api/v1/accounts/detail/`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
        dispatch(authUpdateUserSuccess(response));
        dispatch(dataFilterEntries(new Date(), response.food_entries));
        dispatch(changeDate({date: new Date()}));
    })
    .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
            // Invalid authentication credentials
            return error.response.json().then((data) => {
                dispatch(authUpdateUserFailure(data[Object.keys(data)[0]]));
            });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
            // Server side error
            dispatch(authUpdateUserFailure('A server error occurred while sending your data!'));
        } else {
            // Most likely connection issues
            dispatch(authUpdateUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    });
  };
}
