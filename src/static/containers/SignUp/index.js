import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm'
import { Link } from 'react-router';
import './style.scss';
import * as actionCreators from '../../actions/auth';

import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField/TextField';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

const renderField =  ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
      <TextField
        {...input}
        floatingLabelText={`${label}`}
        required
        type={type}
        errorText={touched && error || touched && warning ? `${error}` : ''}
      />
  </div>
)


class SignUpView extends React.Component {

  constructor(props) {
      super(props);

      const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
      this.state = {
          redirectTo: redirectRoute
      };
  }

  onSubmit(props) {
    this.props.actions.authSignUpUser(props.username, props.phone_number, props.password, "/signup/validate");
    //call submit action
  }

  render() {
    const { statusText, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", marginTop: "16px"}}>
        <h2>Create Account</h2>
        <Paper zDepth={1} className="form">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {statusText ? <div className="status-text">{statusText}</div> : ''}
            <Field name="username" type="text" label="Username" component={renderField} />
            <Field name="phone_number" type="tel" label="Phone number" component={renderField} />
            <Field name="password" type="password" label="Password" component={renderField} />
            <Field name="confirm_password" type="password" label="Confirm password" component={renderField} />
            <RaisedButton style={{marginTop: "10px"}} label="Submit" fullWidth={true} type="submit" disabled={pristine || submitting} primary={true} />
          </form>
        </Paper>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'You must enter a username';
  } else if (values.username.length > 30) {
    errors.username = 'Must be 30 characters or less';
  }
  if (!values.phone_number) {
    errors.phone_number = 'You must enter a phone number ';
  } else if (!/^[0-9-()+-]+$/i.test(values.phone_number)) {
    errors.phone_number = 'You must enter a valid phone number';
  }
  if (!values.password) {
    errors.password = 'You must enter a password';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'You must confirm password';
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }
  return errors;
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        initialValues: {
          phone_number:"1"
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

SignUpView = reduxForm({
  form: 'SignUpView',
  //name of the form does not have to match the component
  fields: ['username', 'phone_number', 'password', 'confirm_password'],
  validate
})(SignUpView);

SignUpView = connect(mapStateToProps, mapDispatchToProps)(SignUpView);

export default SignUpView;
