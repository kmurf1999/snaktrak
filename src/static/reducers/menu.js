import { TOGGLE_MENU, CHANGE_DATE } from '../constants';
import { createReducer } from '../utils';

const initialState = {
  isOpen: false,
  date: new Date()
};

export default createReducer(initialState, {
  [TOGGLE_MENU]: (state, payload) => {
    return Object.assign({}, state, {
        isOpen: payload.isOpen
    });
  },
  [CHANGE_DATE]: (state, payload) => {
    return Object.assign({}, state, {
      date: payload.date,
    });
  }
});
