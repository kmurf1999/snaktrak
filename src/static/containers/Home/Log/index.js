import React from 'react';
import LogEntry from './LogEntry';
import { connect } from 'react-redux';
import {Card, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider/Divider';
import DeleteEntry from './DeleteEntry';
import EditEntry from './EditEntry';

import './style.scss';

class Log extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    expanded: false,
    expandedId: null,
    delete: {
    open: false,
    id: null
    },
    edit: {
    open: false,
    data: null
    }
  }

  this.handleClick = this.handleClick.bind(this);
  this.renderList = this.renderList.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  this.handleClose = this.handleClose.bind(this);
  }

  static propTypes = {
    activeEntries: React.PropTypes.array
  };

  static defaultProps = {
  activeEntries: []
  };

  componentWillReceiveProps() {
  this.forceUpdate();
  }

  handleClick(id, expanded) {
  this.setState(expanded ? {expanded: false} : {expanded: true, expandedId: id});
  }

  handleDelete(id) {
  this.setState({delete: {open: true, id: id}});
  }

  handleEdit(data) {
  this.setState({edit: {open: true, data: data}});
  }

  handleClose(type) {
  switch (type) {
    case "edit":
    this.setState({edit: {open: false, data: null}});
    break;
    case "delete":
    this.setState({delete: {open: false, id: null}});
    break;
    default:
    break;
  }
  }

  renderList() {
  const { activeEntries } = this.props;
  const list = activeEntries.map((entry) =>
    <LogEntry data={entry} onClick={this.handleClick} handleDelete={this.handleDelete} handleEdit={this.handleEdit} expanded={this.state.expanded} expandedId={this.state.expandedId} id={entry.id} key={entry.id}/>
  );
  return list;
  }

  render() {
  const { entries } = this.props;
  return (
    <Card style={{marginTop: "10px", marginBottom: "10px"}}>
    <CardTitle title="Log"/>
    <Divider/>
    <div>
      <ul className="log-list" style={this.state.expanded ? {overflowY: 'hidden'} : {overflowY: 'auto'}}>
      {this.renderList()}
      </ul>
      <DeleteEntry open={this.state.delete.open} handleClose={this.handleClose} id={this.state.delete.id}/>
      <EditEntry open={this.state.edit.open} handleClose={this.handleClose} data={this.state.edit.data}/>
    </div>
    </Card>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    activeEntries: state.data.activeEntries,
    token: state.auth.token,
    date: state.menu.date
  };
};

export default connect(mapStateToProps)(Log);
