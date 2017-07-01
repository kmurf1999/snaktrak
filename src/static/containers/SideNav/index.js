import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/menu';
import { authLogoutAndRedirect } from '../../actions/auth';
import { dataFilterEntries } from '../../actions/data';
import brandIcon from '../../images/favicon.png';


import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import {
  blue50,
  grey800,
  grey700
} from 'material-ui/styles/colors';


class SideNav extends React.Component {
  constructor(props) {
  super(props);

  this.handleToggle = this.handleToggle.bind(this);
  this.handleClose = this.handleClose.bind(this);
  }

  handleToggle = () => {
  this.props.actions.toggleMenu({isOpen: !this.props.isOpen});
  }

  handleClose = () => {
  this.props.actions.toggleMenu({isOpen: false});
  }

  goToIndex = () => {
  this.props.dispatch(push('/'));
  this.props.actions.toggleMenu({isOpen: false});
  }

  goToLogin = () => {
  this.props.actions.toggleMenu({isOpen: false});
  this.props.dispatch(push('/login'));
  }

  goToSignUp = () => {
  this.props.dispatch(push('/signup'));
  this.props.actions.toggleMenu({isOpen: false});
  }

  logout = () => {
  this.props.dispatch(authLogoutAndRedirect());
  this.props.actions.toggleMenu({isOpen: false});
  }

  formatPhoneNumber = (phone_number) => {
  const regex = /(\+1|1)(\d{3})(\d{3})(\d+)/;
  return phone_number.replace(regex, "$1-($2)-$3-$4");
  }

  render() {
  const { isAuthenticated, user: { username, phone_number }} = this.props;
  return (
    <Drawer
    docked={false}
    width={200}
    open={this.props.isOpen}
    onRequestChange={() => this.handleToggle()}
    style={{position: "relative"}}
    >
    <div style={{padding: "16px", backgroundColor: `${blue50}`}}>
      <Avatar style={{marginBottom: "16px"}}>S</Avatar>{/* TODO higher quality brand Image*/}
      <h6 style={{marginBottom: "5px", fontSize: "0.874em", fontFamily: "Roboto", color: `${grey800}`}}>{username ? username : 'SnakTrak'}</h6>
      <h6 style={{fontSize: "0.874em", fontFamily: "Roboto", fontWeight: "300", color: `${grey700}`}}>{phone_number ? this.formatPhoneNumber(phone_number) : ''}</h6>
    </div>
    <MenuItem style={{fontSize: "0.874em"}} leftIcon={<FontIcon className="material-icons">home</FontIcon>} onTouchTap={this.goToIndex}>Home</MenuItem>
    {!isAuthenticated ? <MenuItem style={{fontSize: "0.874em"}} leftIcon={<FontIcon className="material-icons">vpn_key</FontIcon>} onTouchTap={this.goToLogin}>Login</MenuItem> : ''}
    {!isAuthenticated ? <MenuItem style={{fontSize: "0.874em"}} leftIcon={<FontIcon className="material-icons">assignment</FontIcon>} onTouchTap={this.goToSignUp}>Signup</MenuItem> : ''}
    {isAuthenticated ? <MenuItem style={{fontSize: "0.874em"}} leftIcon={<FontIcon className="material-icons">assignment_return</FontIcon>} onTouchTap={this.logout}>Logout</MenuItem> : ''}
    <div style={{fontSize: "0.874em", textAlign: "center", bottom: "16px", position: "absolute", right: 0, left: 0}}>
      <a style={{fontSize: "0.874em" }} href="">Terms</a> / <a style={{fontSize: "0.874em" }} href="">Privacy</a>{/* TODO make privacy and terms pages */}
    </div>
    </Drawer>
  );
  }
}

const mapStateToProps = (state) => {
  return {
  path: state.routing.locationBeforeTransitions.pathname,
  isOpen: state.menu.isOpen,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(ActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
