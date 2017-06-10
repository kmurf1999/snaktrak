import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm'
import * as actionCreators from '../../actions/auth';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField/TextField';
import CircularProgress from 'material-ui/CircularProgress';



const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        setupForm: state.auth.setupForm,
        username: state.auth.user.username,
        phone_number: state.auth.user.phone_number
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


class WeightSetupView extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.props.actions.authSetupFormChange(target.name, target.value);
  }

  render() {
    const { setupForm: { current_weight, target_weight }} = this.props;
    return (
      <div>
        <div>
          <TextField name="current_weight" value={current_weight} onChange={this.handleChange} floatingLabelText="Current Weight (lbs)" required type="tel"/>
        </div>
        <div>
          <TextField name="target_weight" value={target_weight} onChange={this.handleChange} floatingLabelText="Goal Weight (lbs)" required type="tel"/>
        </div>
      </div>
    );
  }
}
WeightSetupView = connect(mapStateToProps, mapDispatchToProps)(WeightSetupView);


class CalorieSetupView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target_calories: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.props.actions.authSetupFormChange(target.name, target.value);
  }

  render() {
    const { setupForm: { target_calories }} = this.props;
    return (
      <div>
        <div>
          <TextField name="target_calories" value={target_calories} onChange={this.handleChange} floatingLabelText="Calorie Goal (kCal)" required type="tel"/>
        </div>
      </div>
    );
  }
}
CalorieSetupView = connect(mapStateToProps, mapDispatchToProps)(CalorieSetupView);


class MacroSetupView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target_carbohydrate: '',
      target_protein: '',
      target_fat: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.props.actions.authSetupFormChange(target.name, target.value);
  }

  render() {
    const { setupForm: { target_carbohydrate, target_protein, target_fat }} = this.props;
    return (
      <div>
        <div>
          <TextField name="target_carbohydrate" value={target_carbohydrate} onChange={this.handleChange} floatingLabelText="Carbohydrate Target (g)" required type="tel"/>
        </div>
        <div>
          <TextField name="target_protein" value={target_protein} onChange={this.handleChange} floatingLabelText="Protein Target (g)" required type="tel"/>
        </div>
        <div>
          <TextField name="target_fat" value={target_fat} onChange={this.handleChange} floatingLabelText="Fat Target (g)" required type="tel"/>
        </div>
      </div>
    );
  }
}
MacroSetupView = connect(mapStateToProps, mapDispatchToProps)(MacroSetupView);


class FinishView extends React.Component {

  render() {
    const { statusText } = this.props;
    return (
      <div>
        {statusText ? <div className="status-text">{statusText}</div> : ''}
        <CircularProgress />
      </div>
    );
  }
}
FinishView = connect(mapStateToProps, mapDispatchToProps)(FinishView);



class SetupView extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    orientation: "horizontal",
  };

  componentWillMount() {
    this.setState({
      orientation: window.innerWidth < 600 ? "vertical" : "horizontal"
    });
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
    if (stepIndex >= 2) {
      this.submitForm();
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <WeightSetupView/>;
      case 1:
        return <CalorieSetupView/>;
      case 2:
        return <MacroSetupView/>;
      default:
        return <FinishView/>;
    }
  }

  submitForm(){
    const { token, setupForm, username, phone_number } = this.props;
    this.props.actions.authSetupFormSubmit(token, setupForm, username, phone_number);
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", marginTop: "16px"}}>
        <h3>Setup Your Account</h3>
        <Paper style={{maxWidth: "calc(100vw - 32px)", margin: "32px", paddingBottom: "16px"}} zDepth={1}>
          <Stepper activeStep={stepIndex} orientation={this.state.orientation}>
            <Step>
              <StepLabel>Enter weight information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Set calorie goals</StepLabel>
            </Step>
            <Step>
              <StepLabel>Configure macros</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  return errors;
}


SetupView = connect(mapStateToProps, mapDispatchToProps)(SetupView);

export default SetupView;
