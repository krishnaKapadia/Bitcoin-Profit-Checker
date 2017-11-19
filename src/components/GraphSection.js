import React, { Component } from 'react';
import LineChart from './LineChart';

class GraphSection extends Component {

  getData = () => {
    // Endpoint to fetch bitcoin chart data
    // https://api.coindesk.com/v1/bpi/historical/close.json
  }

  render() {
    return (
      <div className="">
        <div className="">
          <div className="chart">
            <LineChart data={this.props.data} prev={this.props.prev} />
          </div>
        </div>

      </div>
    );
  }

}

export default GraphSection;
