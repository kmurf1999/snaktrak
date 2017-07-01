import {
  TOGGLE_MENU,
  CHANGE_DATE
} from '../constants';

export function toggleMenu(isOpen = false) {
  return {
  type: TOGGLE_MENU,
  payload: isOpen
  };
}

export function changeDate(date) {

  return {
  type: CHANGE_DATE,
  payload: date
  };
}
