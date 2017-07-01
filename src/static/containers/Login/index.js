import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm'
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

class LoginView extends React.Component {

  constructor(props) {
    super(props);

    const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
    this.state = {
      redirectTo: redirectRoute
    };
  }

  componentWillMount() {
  if(this.props.isAuthenticated) {
    this.props.dispatch(push('/'));
  }
  }

  onSubmit(props) {
  this.props.actions.authLoginUser(props.username, props.password);
  //call submit action
  }

  render() {
  const { statusText, handleSubmit, pristine, reset, submitting } = this.props;
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", marginTop: "16px"}}>
    <h2>Login</h2>
    <Paper zDepth={1} className="form">
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
      {statusText ? <div className="status-text">{statusText}</div> : ''}
      <Field name="username" type="text" label="Username" component={renderField} />
      <Field name="password" type="password" label="Password" component={renderField} />
      <RaisedButton style={{marginTop: "10px"}} label="Login" fullWidth={true} type="submit" disabled={pristine || submitting} primary={true} />
      </form>
    </Paper>
    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
  errors.username = 'You must enter a username';
  }
  if (!values.password) {
  errors.password = 'You must enter a password';
  }

  return errors;
}

const mapStateToProps = (state) => {
  return {
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

LoginView = reduxForm({
  form: 'LoginView',
  //name of the form does not have to match the component
  fields: ['username', 'password'],
  validate
})(LoginView);

LoginView = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default LoginView;
