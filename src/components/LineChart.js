import React, { Component } from 'react';
import '../style/LineChart.css';
import { Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

class Chart extends Component {

  render() {

    return (
        <LineChart className="chartJS" data={this.props.data} width={800} height={400}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3"/>
          {/* {this.props.prev !== '' && <ReferenceLine y={this.props.prev} stroke="green" label="Last Investment" />} */}
        </LineChart>
    );
  }
}


export default Chart;
