import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../actions/data';

class DeleteEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  static propTypes = {
    open: React.PropTypes.bool,
    id: React.PropTypes.number
  };

  componentWillReceiveProps(props) {
    this.setState({open: props.open});
  }

  handleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleClose("delete");
  }

  handleConfirm(e) {
    e.preventDefault();
    e.stopPropagation();
    //TODO actions delete entry
    this.props.handleClose("delete");
    this.props.actions.dataDeleteFoodEntry(this.props.token, this.props.id);
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

    return (
      <Dialog
        title="Delete Entry"
        actions={actions}
        modal={false}
        open={this.props.open}
      >
        This will permantly delete this entry
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


export default connect(mapStateToProps, mapDispatchToProps)(DeleteEntry);
