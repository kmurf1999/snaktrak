import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

import './images/favicon.png';

import { Navbar, SideNav } from './containers';

class App extends React.Component {

  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.shape().isRequired,
    dispatch: React.PropTypes.func.isRequired,
    pathName: React.PropTypes.string.isRequired
  };

  render() {
    return (
    <MuiThemeProvider>
      <div className="app">
      <Navbar />
      <SideNav />
      <section style={{display: "flex", justifyContent: "center", margin: 0}}>
        {this.props.children}
      </section>
      </div>
    </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    pathName: ownProps.location.pathname
  };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
