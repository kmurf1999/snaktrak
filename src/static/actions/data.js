import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
  DATA_FETCH_PROTECTED_DATA_REQUEST,
  DATA_RECEIVE_PROTECTED_DATA,

  DATA_FETCH_ENTRIES_DATA_REQUEST,
  DATA_RECEIVE_ENTRIES_DATA,
  DATA_FILTER_ENTRIES,
} from '../constants';
import { authLoginUserFailure, authReloadUser } from './auth';

//filter entries for the specified day
export function dataFilterEntries(date, entries) {
  let list = entries.filter((entry) =>
    new Date(entry.pub_date).toDateString() === new Date(date).toDateString()
  );
  return {
    type: DATA_FILTER_ENTRIES,
    payload: list
  };
}


/// fetch entries data with auth token ///
/// should fire this action on main userpage mount
//TODO this is outdated
export function dataFetchEntriesData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchEntriesDataRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/detail/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataRecieveEntriesData(response));
                dispatch(dataFilterEntries(new Date(), response.food_entries));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function dataFetchEntriesDataRequest() {
  return {
    type: DATA_FETCH_ENTRIES_DATA_REQUEST
  };
}

export function dataRecieveEntriesData(data) {
  return {
    type: DATA_RECEIVE_ENTRIES_DATA,
    payload: data
  };
}
/// end fetchEntriesData ///

/// fetch data with auth token ///
export function dataFetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/detail/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: data
    };
}


export function dataDeleteFoodEntry(token, id) {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/entries/FoodEntry/${id}/`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authReloadUser(token));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                } else {
                    // Most likely connection issues
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function dataUpdateFoodEntry(token, data) {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/entries/FoodEntry/${data.id}/`, {
            method: 'put',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${token}`
            },
            body: JSON.stringify({
              food_name: `${data.food_name}`,
              id: `${data.id}`,
              pub_date: `${data.pub_date}`,
              serving_qty: `${data.serving_qty}`,
              serving_unit: `${data.serving_unit}`,
              total_calories: `${data.total_calories}`,
              total_carbohydrate: `${data.total_carbohydrate}`,
              total_protein: `${data.total_protein}`,
              total_fat: `${data.total_fat}`
            })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authReloadUser(token));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                } else {
                    // Most likely connection issues
                }
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
