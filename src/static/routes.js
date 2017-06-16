import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, NotFoundView, SignUpView, ValidateNumberView, SetupView } from './containers';

import requireAuthentication from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView} />
        <Route path="login" component={LoginView} />
        <Route path="signup" component={SignUpView} />
        <Route path="signup/setup" component={SetupView} />
        <Route path="signup/validate" component={ValidateNumberView} />
        <Route path="*" component={NotFoundView} />
    </Route>
);
