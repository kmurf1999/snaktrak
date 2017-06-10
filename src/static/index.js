import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './actions/auth';
import { dataFilterEntries } from './actions/data';
import { install } from 'offline-plugin/runtime';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
install();

const initialState = {};
const target = document.getElementById('root');

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const node = (
    <Root store={store} history={history} />
);

const token = sessionStorage.getItem('token');
let user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginUserSuccess(token, user));
    store.dispatch(dataFilterEntries(new Date(), user.food_entries));
}

ReactDOM.render(node, target);
