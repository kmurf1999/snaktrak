import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/menu';
import { authReloadUser } from '../../actions/auth';
import { dataFilterEntries } from '../../actions/data';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import MenuItem from 'material-ui/MenuItem';


class Navbar extends React.Component {
  constructor(props) {
  super(props);

  this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
  this.props.actions.toggleMenu({isOpen: !this.props.isOpen});
  }

  componentWillReceiveProps() {
  this.forceUpdate();
  }

  changeDate(dayChangeCount) {

  //pass this function the number of days you want to change the date
  // ex: 1 means add 1 day to the date
  // 86400000 is a day in ms
  let newDate = new Date(this.props.date.getTime() + (86400000*dayChangeCount));
  this.props.actions.changeDate({date: newDate});

  // refilter the activeEntries to the current date
  this.props.dispatch(dataFilterEntries(newDate, this.props.user.food_entries));
  }

  renderDateString() {
  const { date } = this.props;
  if (date.getDate() === new Date().getDate()) {
    return "Today";
  } else if (date.getDate() === new Date(new Date().getTime() + 86400000).getDate()) {
    return "Tomorrow";
  } else if (date.getDate() == new Date(new Date().getTime() - 86400000).getDate()) {
    return "Yesterday";
  } else {
    return date.toDateString().replace(/(.*)\s\d{4}/, "$1");
  }
  }

  reloadUser() {
  this.props.dispatch(authReloadUser(this.props.token));
  }

  render() {
  const white = {color: "#fff"};
  const { isAuthenticated, path } = this.props;
  return (
    <nav>
    {isAuthenticated && path === '/'
    ?
    <Toolbar style={{backgroundColor: "rgb(0, 188, 212)"}}>
      <ToolbarGroup firstChild={true}>
      <IconButton touch={true}>
        <FontIcon onTouchTap={() => this.toggleNav()} className="material-icons" color={"white"} >menu</FontIcon>
      </IconButton>
      </ToolbarGroup>
      <ToolbarGroup firstChild={true} style={{margin: "0 auto"}}>
      <IconButton touch={true}>
        <FontIcon onTouchTap={() => this.changeDate(-1)} className="material-icons" color={"white"}>chevron_left</FontIcon>
      </IconButton>
      <ToolbarTitle style={{color: "#fff", padding: "0"}} text={this.renderDateString()} />
      <IconButton touch={true}>
        <FontIcon onTouchTap={() => this.changeDate(1)} className="material-icons" color={"white"}>chevron_right</FontIcon>
      </IconButton>
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
      <IconButton>
        <FontIcon onTouchTap={() => this.reloadUser()} className="material-icons" color={"white"} >autorenew</FontIcon>
      </IconButton>
      </ToolbarGroup>
    </Toolbar>
    :
    <Toolbar style={{backgroundColor: "rgb(0, 188, 212)"}}>
      <ToolbarGroup firstChild={true}>
      <IconButton touch={true}>
        <FontIcon onTouchTap={() => this.toggleNav()} className="material-icons" color={"white"} >menu</FontIcon>
      </IconButton>
      <ToolbarTitle style={white} text="SnakTrak" />
      </ToolbarGroup>
    </Toolbar>
    }
    </nav>
  );
  }
}

const mapStateToProps = (state) => {
  return {
  path: state.routing.locationBeforeTransitions.pathname,
  isOpen: state.menu.isOpen,
  date: state.menu.date,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(ActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//   changeDate = (dayChangeCount) => {
//
//   //pass this function the number of days you want to change the date
//   // ex: 1 means add 1 day to the date
//   // 86400000 is a day in ms
//   let newDate = new Date(this.props.date.getTime() + (86400000*dayChangeCount));
//   this.props.actions.changeDate({date: newDate});
//
//   // refilter the activeEntries to the current date
//   this.props.dispatch(dataFilterEntries(newDate, this.props.user.food_entries));
//   }
//
//   renderDateString = () => {
//   const { date } = this.props;
//   if (date.getDate() === new Date().getDate()) {
//     return "Today";
//   } else if (date.getDate() === new Date(new Date().getTime() + 86400000).getDate()) {
//     return "Tomorrow";
//   } else if (date.getDate() == new Date(new Date().getTime() - 86400000).getDate()) {
//     return "Yesterday";
//   } else {
//     return date.toDateString().replace(/(.*)\s\d{4}/, "$1");
//   }
//   }
