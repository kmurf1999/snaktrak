import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  HomeView, LoginView, NotFoundView, SignUpView, ValidateNumberView, SetupView
} from './containers';
import App from './app';

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
