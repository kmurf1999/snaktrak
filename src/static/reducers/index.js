import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import menuReducer from './menu';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    menu: menuReducer,
    form: formReducer
});
