import React, { Component } from 'react';
import InfoBox from './InfoBox';
import LineChart from './LineChart';

class GraphSection extends Component {

  getData = () => {
    // Endpoint to fetch bitcoin chart data
    // https://api.coindesk.com/v1/bpi/historical/close.json
  }

  render() {
    return (
      <div className="">

        {/* <div className="row">
          <h1>30 Day Bitcion Price Chart</h1>
        </div> */}

        <div className="row">
          <InfoBox data={this.props.data} liveRate={this.props.liveRate} />
        </div>

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
