import { createReducer } from '../utils';
import {
  DATA_RECEIVE_PROTECTED_DATA,
  DATA_FETCH_PROTECTED_DATA_REQUEST,
  DATA_FILTER_ENTRIES
} from '../constants';


const initialState = {
  userdata: null,
  activeEntries: [],
  isFetching: false
};

export default createReducer(initialState, {
  [DATA_RECEIVE_PROTECTED_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      userdata: payload.userdata,
      isFetching: false
    });
  },
  [DATA_FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  [DATA_FILTER_ENTRIES]: (state, payload) => {
    return Object.assign({}, state, {
      activeEntries: payload
    });
  }
});
