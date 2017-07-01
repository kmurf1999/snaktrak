import React from 'react';
import VictoryLabel from "victory-core/victory-label/victory-label";
import VictoryPie from 'victory-pie/components/victory-pie';

class ProgressChart extends React.Component {
  constructor(props) {
  super(props);

  this.renderData = this.renderData.bind(this);
  }

  static propTypes = {
  part: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
  fillColor: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  suffix: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
  };

  static defaultProps = {
  width: 200,
  height: 200,
  suffix: "",
  total: 1,
  part: 0
  };

  renderData() {
  const { part, total } = this.props;
  let data = [];
  if (part > total) {
    data.push(
    {y: part},
    {y: 0}
    );
  } else {
    data.push(
    {y: part},
    {y: total-part}
    );
  }
  return data;
  }

  render() {
  const { part, width, height, fillColor, type, suffix } = this.props;
  const data = part ? this.renderData() : [{y:0},{y:1}];
  const color = [fillColor, "#ecf0f1", "#bdc3c7"]
  return (
    <svg width={width} height={height} viewBox="0 0 200 200" >
    <VictoryPie
      standalone={false}
      width={width} height={height}
      padding={5}
      data={data}
      innerRadius={width/2.5}
      colorScale={color}
      style={{ labels: { fontSize: 0}, width: "100%", height: "auto"}}
      animate={{duration: 500}}
    />
    <VictoryLabel
      textAnchor="middle" verticalAnchor="middle"
      x={width/2} y={(height/2)-15}
      style={{fontSize: 60, fill: color[0]}}
      text={data[0].y + suffix}
    />
    <VictoryLabel
      textAnchor="middle" verticalAnchor="middle"
      x={width/2} y={(height/2)+25}
      style={{fontSize: 35, fill: color[2]}}
      text={type}
    />
    </svg>
  );
  }
}

export default ProgressChart;
