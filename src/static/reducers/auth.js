import { createReducer } from '../utils';
import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
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
  AUTH_UPDATE_USER_SUCCESS,
  AUTH_UPDATE_USER_FAILURE
} from '../constants';


const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  user: {},
  setupForm: {
    current_weight: '',
    target_weight: '',
    target_calories: '',
    target_carbohydrate: '',
    target_protein: '',
    target_fat: ''
  }
};

export default createReducer(initialState, {
  [AUTH_LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    });
  },
  [AUTH_LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      user: payload.user
    });
  },
  [AUTH_LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      user: {},
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      user: {},
      statusText: 'Logout successful'
    });
  },
  [AUTH_SIGNUP_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      statusText: null
    });
  },
  [AUTH_SIGNUP_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: null
    });
  },
  [AUTH_SIGNUP_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      user: {},
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_VALIDATE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: null
    });
  },
  [AUTH_VALIDATE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_VALIDATE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_VALIDATE_RESEND_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: null
    });
  },
  [AUTH_VALIDATE_RESEND_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_VALIDATE_RESEND_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `${payload.statusText}`
    });
  },
  [AUTH_SETUP_FORM_CHANGE]: (state, payload) => {
    return Object.assign({}, state, {
      setupForm: {
        ...state.setupForm,
        [payload.target]: `${payload.value}`
      }
    });
  },
  [AUTH_UPDATE_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      user: payload.user
    });
  },
  [AUTH_UPDATE_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: payload.statusText
    });
  },
});
