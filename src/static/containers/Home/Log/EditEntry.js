import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import TextField from 'material-ui/TextField/TextField';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../actions/data';

class EditEntry extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    open: false,
    form: {}
  };

  this.handleClose = this.handleClose.bind(this);
  this.handleConfirm = this.handleConfirm.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  }

  static propTypes = {
  open: React.PropTypes.bool,
  id: React.PropTypes.number
  };

  componentWillReceiveProps(props) {
  this.setState({open: props.open, form: props.data});
  }

  handleClose(e) {
  e.preventDefault();
  e.stopPropagation();
  this.props.handleClose("edit");
  }

  handleConfirm(e) {
  e.preventDefault();
  e.stopPropagation();
  this.props.handleClose("edit");
  this.props.actions.dataUpdateFoodEntry(this.props.token, this.state.form);
  }

  handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  this.setState({
    form: {
    ...this.state.form,
    [name]: value
    }
  });
  }

  render() {
  const actions = [
    <FlatButton
    label="Cancel"
    primary={true}
    onTouchTap={(e) => this.handleClose(e)}
    />,
    <FlatButton
    label="ok"
    primary={true}
    keyboardFocused={true}
    onTouchTap={(e) => this.handleConfirm(e)}
    />,
  ];

  const form = this.props.data !== null ? (
    <div>
    <TextField
      style={{display: "block", width: "auto"}}
      floatingLabelText="Food Name"
      required
      type="text"
      value={this.state.form.food_name}
      onChange={this.handleInputChange}
      name="food_name"
    />
    <TextField
      style={{display: "block", width: "auto"}}
      floatingLabelText="Serving Qty"
      required
      type="tel"
      value={this.state.form.serving_qty}
      onChange={this.handleInputChange}
      name="serving_qty"
    />
    <TextField
      style={{display: "block", width: "auto"}}
      floatingLabelText="Serving Unit"
      required
      type="text"
      value={this.state.form.serving_unit}
      onChange={this.handleInputChange}
      name="serving_unit"
    />
    <TextField
      style={{display: "block", width: "auto"}}
      floatingLabelText="Calories"
      required
      type="num"
      value={this.state.form.total_calories}
      onChange={this.handleInputChange}
      name="total_calories"
    />
    <TextField
      style={{display: "inline-block", width: "33%"}}
      floatingLabelText="Carbs"
      required
      type="num"
      value={this.state.form.total_carbohydrate}
      onChange={this.handleInputChange}
      name="total_carbohydrate"
    />
    <TextField
      style={{display: "inline-block", width: "33%"}}
      floatingLabelText="Protein"
      required
      type="num"
      value={this.state.form.total_protein}
      onChange={this.handleInputChange}
      name="total_protein"
    />
    <TextField
      style={{display: "inline-block", width: "33%"}}
      floatingLabelText="Fat"
      required
      type="num"
      value={this.state.form.total_fat}
      onChange={this.handleInputChange}
      name="total_fat"
    />
    </div>
  ) : '' ;

  return (
    <Dialog
    title="Edit Entry"
    actions={actions}
    modal={false}
    open={this.props.open}
    >
    {form}
    </Dialog>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
