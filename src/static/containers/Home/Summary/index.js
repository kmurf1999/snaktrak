import React from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import './style.scss';

import ProgressChart from '../charts/ProgressChart/index';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {calories: 0, carbs: 0, protein: 0, fat: 0}
    };

    this.loadData = this.loadData.bind(this);
  }

  componentWillReceiveProps(){
    this.forceUpdate();
  }

  loadData() {
    const { activeEntries } = this.props;
    let data = {calories: 0, carbs: 0, protein: 0, fat: 0};
    activeEntries.map((entry) => {
      data.calories += entry.total_calories;
      data.carbs += entry.total_carbohydrate;
      data.protein += entry.total_protein;
      data.fat += entry.total_fat;
    });
    return data;
  }

  render() {
    const colors = ["#90CAF9", "#89d78f", "#EF9A9A", "#FFE082"];
    const { calories, carbs, protein, fat } = this.loadData();
    const { target_calories, target_carbohydrate, target_protein, target_fat } = this.props.user;
    return (
      <Card style={{marginTop: "10px", marginBottom: "10px"}}>
        <div className="summary-container">
          <ProgressChart part={Math.round(calories)} total={target_calories} fillColor={colors[0]} type="calories"/>
          <ProgressChart part={Math.round(carbs)} total={target_carbohydrate} fillColor={colors[1]} suffix="g" type="carbs"/>
          <ProgressChart part={Math.round(protein)} total={target_protein} fillColor={colors[2]} suffix="g" type="protein"/>
          <ProgressChart part={Math.round(fat)} total={target_fat} fillColor={colors[3]} suffix="g" type="fat"/>
          {/* TODO adjust macros tab */}
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        activeEntries: state.data.activeEntries,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Summary);
