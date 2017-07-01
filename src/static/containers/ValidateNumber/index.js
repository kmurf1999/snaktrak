import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import Subheader from 'material-ui/Subheader';

import * as actionCreators from '../../actions/auth';


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <TextField {...input}
        floatingLabelText={`${label}`}
        required
        type={type}
        errorText={(touched && error) || (touched && warning) ? `${error}` : ''}
      />
    </div>
  );
};

renderField.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
};


class ValidateNumberView extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    code: React.PropTypes.number,
    statusText: React.PropTypes.string,
    handleSubmit: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired
  };

  static defaultProps = {
    code: 0,
    statusText: ''
  };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onResend = this.onResend.bind(this);
  }

  onSubmit(props) {
    this.props.actions.authValidation(this.props.token, this.props.code);
    // dispatch(this.push('/signup/validate'));
    // call submit action
  }

  onResend() {
    this.props.actions.authResendValidationKey(this.props.token);
    // dispatch(this.push('/signup/validate'));
  }

  render() {
    const { statusText, handleSubmit, pristine, submitting } = this.props;
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '16px' }}
      >
        <h3>Validate your Number</h3>
        <Subheader>Enter the 6 digit validation code that we sent you</Subheader>
        <Paper zDepth={1} className="form">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            {statusText ? <div className="status-text">{statusText}</div> : null}
            <Field name="code" type="tel" label="Enter Code" component={renderField} />
            <div style={{
              marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <RaisedButton label="Resend"
                onTouchTap={() => { this.onResend(); }} disabled={submitting}
              />
              <RaisedButton label="Submit"
                type="Submit" disabled={pristine || submitting} primary={true} keyboardFocused={true}
              />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

ValidateNumberView = reduxForm({
  form: 'ValidateNumberView',
  // name of the form does not have to match the component
  fields: ['code'],
})(ValidateNumberView);

ValidateNumberView = connect(mapStateToProps, mapDispatchToProps)(ValidateNumberView);

export default ValidateNumberView;
