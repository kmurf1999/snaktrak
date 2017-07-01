import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import dataReducer from './data';
import menuReducer from './menu';


export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  routing: routerReducer,
  menu: menuReducer,
  form: formReducer
});
