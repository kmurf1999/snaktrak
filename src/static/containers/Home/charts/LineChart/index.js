import React from 'react';

import VictoryTooltip from "victory-core/victory-tooltip/victory-tooltip";
import VictoryLabel from "victory-core/victory-label/victory-label";


import VictoryAxis from "victory-chart/components/victory-axis/victory-axis";
import VictoryArea from "victory-chart/components/victory-area/victory-area";
import VictoryScatter from "victory-chart/components/victory-scatter/victory-scatter";
import VictoryLine from "victory-chart/components/victory-line/victory-line";
import VictoryChart from "victory-chart/components/victory-chart/victory-chart";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.getDomain = this.getDomain.bind(this);
    this.renderMovingAverage = this.renderMovingAverage.bind(this);
  }

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    currentWeight: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    data: [],
    currentWeight: 0
  };

  renderMovingAverage() {
    const { data } = this.props;
    let movingAvg = [];
    for (let i = 0; i < data.length; i++){
      let sum = 0;
      let obs = 0;
      if(data[i-2]) {
        sum += data[i-2].value;
        obs++;
      }
      if(data[i-1]) {
        sum += data[i-1].value;
        obs++;
      }
      if(data[i]) {
        sum += data[i].value;
        obs++;
      }
      movingAvg.push({date: data[i].date, value: sum/obs});
    }
    return movingAvg;
  }

  getDomain() {
    const { data } = this.props;
    const minDate = new Date(data[0].date);
    const maxDate = new Date(data[data.length-1].date);
    const valueArray = data.map(data => data.value);
    const minValue = Math.min(...valueArray);
    const maxValue = Math.max(...valueArray);
    const padding = (maxValue - minValue)/10;
    return {x: [minDate, maxDate], y: [minValue-padding, maxValue+padding]};
  }

  render() {
    const { data, currentWeight } = this.props;
    return (
      <VictoryChart
        width={350}
        height={250}
        scale={{x: "time", y: "linear"}}
        domain={this.getDomain()}
        padding={{top: 0, bottom: 40, left: 45, right: 15}}
        className="line-chart"
        animate={{duration: 200}}
      >
        <VictoryScatter
          data={data}
          x={data => new Date(data.date)}
          y={data => data.value}
          style={{
            data: {fill: "#90CAF9", opacity: 1},
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal
              style={{
                fill: "#fff"
              }}
              flyoutStyle={{
                fill: "#81D4FA", stroke: "0px"
              }}
              pointerLength={10}
              pointerWidth={0}
            />
          }
        />
        <VictoryLine
          data={data}
          style={{
            data: {stroke: "#90CAF9", strokeWidth: "2px", strokeLinecap: "round"},
            labels: {fontSize: 0}
          }}
          x={data => new Date(data.date)}
          y="value"
          interpolation="cardinal"
        />
        <VictoryLine
          data={this.renderMovingAverage()}
          style={{
            data: {stroke: "#ccc", strokeWidth: "1px", strokeLinecap: "round"},
            labels: {fontSize: 0}
          }}
          x={data => new Date(data.date)}
          y="value"
          interpolation="natural"
        />
        <VictoryArea
          data={data}
          style={{
            data: {fill: "#90CAF9", opacity: 0.1},
            labels: {fontSize: 0}
          }}
          x={data => new Date(data.date)}
          y={data => data.value - 0.5*Math.log(data.value)}
        />
        <VictoryAxis
          style={{
            axis: {stroke: "#ccc"},
            tickLabels: {font: "Roboto", fill: "#7f8c8d", fontSize: 13, padding: 5}
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: {opacity: 0},
            grid: {stroke: "grey", opacity: 0.2},
            tickLabels: {fontSize: 13, fill: "#95a5a6", padding: 5}
          }}
        />
      </VictoryChart>
    );
  }
}

export default LineChart;
