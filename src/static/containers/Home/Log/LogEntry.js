import React from 'react';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

class LogEntry extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    deleteEntryOpen: false
  };

  this.handleClick = this.handleClick.bind(this);
  this.deleteEntry = this.deleteEntry.bind(this);
  this.editEntry = this.editEntry.bind(this);
  }

  static propTypes = {
  data: React.PropTypes.object.isRequired,
  id: React.PropTypes.number.isRequired,
  expandedId: React.PropTypes.number,
  expanded: React.PropTypes.bool
  };

  handleClick() {
  const {id, expanded} = this.props;
  this.props.onClick(id, expanded);
  }

  editEntry(e) {
  e.stopPropagation();
  e.preventDefault();
  this.props.handleEdit(this.props.data);
  }

  deleteEntry(e) {
  e.stopPropagation();
  e.preventDefault();
  this.props.handleDelete(this.props.id);
  }

  render() {
  const {id, expanded, expandedId, data: {
    food_name, serving_qty, serving_unit, total_calories, total_carbohydrate, total_protein, total_fat, pub_date
  }} = this.props;
  const time = new Date(pub_date).toTimeString().split("-")[0];
  const shown = expanded && (id === expandedId) ? true : false;
  const expandedStyle = {
    maxHeight: '300px',
    height: '98%'
  };
  const rotate180Style = {
    'transform': 'rotate(180deg)'
  }
  const closedStyle = expanded ? {
    maxHeight: "0px",
    margin: "0",
    border: "none"
  } : {};

  return (
    <li onTouchTap={this.handleClick} style={shown ? expandedStyle : closedStyle} className="log-entry">
    <h2 className="log-entry-foodname" width="80%">{food_name}</h2>
    <h2 className="log-entry-fooddetail" width="80%">{serving_qty} {serving_unit} {total_calories} calories</h2>
    <h2 width="20%" className="log-entry-time">{time}</h2>
    <i style={shown ? rotate180Style : closedStyle} className="material-icons log-entry-expand-button">arrow_drop_down_circle</i>
    <div className="log-entry-expanded">
      <div className="log-entry-expanded-group" ><h2 className="color-circle">{Math.round(total_calories)}</h2><h2>Cal</h2></div>
      <div className="log-entry-expanded-group" ><h2 className="color-circle">{Math.round(total_carbohydrate)}g</h2><h2>Carb</h2></div>
      <div className="log-entry-expanded-group" ><h2 className="color-circle">{Math.round(total_protein)}g</h2><h2>Prot</h2></div>
      <div className="log-entry-expanded-group" ><h2 className="color-circle">{Math.round(total_fat)}g</h2><h2>Fat</h2></div>
    </div>
    <div className="log-entry-edit">
      <RaisedButton onTouchTap={(e) => this.editEntry(e)} label="edit"/>
      <RaisedButton onTouchTap={(e) => this.deleteEntry(e)} label="delete" secondary={true} />
    </div>
    </li>
  );
  }
}

export default LogEntry;
