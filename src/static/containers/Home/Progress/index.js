import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import {Card, CardActions, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';


import LineChart from '../charts/LineChart/index';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../../actions/auth';

class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avg: 0,
      domain: "month"
    };
    this.renderData = this.renderData.bind(this);
    this.changeDomain = this.changeDomain.bind(this);
  }

  componentWillMount() {
    let sum = 0;
    let obs = 0;
    const { weight_entries } = this.props.user;
    weight_entries.map(entry => {
      sum += entry.weight;
      obs++;
    });
    const avg = Math.round((sum/obs)*10)/10;
    this.setState({avg: avg});
    this.renderData(weight_entries);
  }

  renderData(weight_entries) {
    // renders lables and dates for the data from the weight entries passed into the function
    // the entries take the form of [{pub_date: '', weight: ''}]
    let data = [];

    weight_entries.map(entry => {
      const date = entry.pub_date.split("T")[0];
      data.push({date: date, value: entry.weight, label: `${entry.weight}lbs`});
    });

    this.setState({data: data});
  }

  changeDomain(type) {
    // type "week" "day" "month"
    const { weight_entries } = this.props.user;
    let data = [];
    switch (type) {
      case "month":
        data = weight_entries.filter(entry => {
          return new Date(entry.pub_date) > new Date(new Date() - 2592000000); //month in ms
        });
        this.setState({domain: "month"});
        break;
      case "week":
        data = weight_entries.filter(entry => {
          return new Date(entry.pub_date) > new Date(new Date() - 604800000); //week in ms
        });
        this.setState({domain: "week"});
        break;
      case "year":
        data = weight_entries.filter(entry => {
          return new Date(entry.pub_date) > new Date(new Date() - 31104000000); //year in ms
        });
        this.setState({domain: "year"});
        break;
      default:
        data = weight_entries;
        break;
    }
    this.renderData(data);
  }

  reloadUserData() {
    this.props.actions.authReloadUser(this.props.token);
  }

  render() {
    const { user: { target_weight, current_weight, start_weight }} = this.props;
    const { domain } = this.state;
    let page = '';
    if (this.state.data.length < 3) {
      page = (
        <div>
          <Subheader style={{lineHeight: "auto"}}>Not enough Data.</Subheader>
          <CardText style={{paddingTop: "5px"}}>Make atleast 3 weight entries to view your weight graph.</CardText>
          <CardActions>
            <RaisedButton onTouchTap={() => this.reloadUserData()} label="Reload user data"/>
          </CardActions>
        </div>
      );
    } else {
      page = (
        <div>
          <CardActions style={{display: "flex", justifyContent: "center", flexDirection: "row"}}>
              <FlatButton label="Week" onTouchTap={() => this.changeDomain("week")} primary={domain === "week"} />
              <FlatButton label="Month" onTouchTap={() => this.changeDomain("month")} primary={domain === "month"} />
              <FlatButton label="Year" onTouchTap={() => this.changeDomain("year")} primary={domain === "year"} />
          </CardActions>
          <LineChart currentWeight={current_weight} data={this.state.data}/>
          <div className="progress-summary">
            <div>
              <h6>Start</h6>
              <h4>{`${start_weight} lbs`}</h4>
            </div>
            <div>
              <h6>Avg</h6>
              <h4>{`${this.state.avg} lbs`}</h4>
            </div>
            <div>
              <h6>Goal</h6>
              <h4>{`${target_weight} lbs`}</h4>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Card >
        <CardTitle style={{paddingTop: "8px"}} title="Weight" subtitle="View your progress"/>
        {page}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
