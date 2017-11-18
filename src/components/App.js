import React, { Component } from 'react';
import '../style/App.css';
import { Row, Form } from 'react-bootstrap';
import axios from 'axios';
import { formatNumber } from '../utils/utils';
import GraphSection from './GraphSection';
import moment from 'moment';

class App extends Component {

  constructor(props){
    super(props);

    this.state = { loaded: false, lables: [], prices: [], data: [], rate: '', amount: '', liveRate: '' , profit: '', changePercent: ''};
  }

  componentDidMount() {
    // const url = `https://api.coindesk.com/v1/bpi/historical/close.json`

    // historical data API
    const result = axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=nzd&index=nzd');

    result.then((data) => {
      const sortedData = [];

      const lables = [];
      const prices = [];

      for(let date in data.data.bpi){
        lables.push(date);
        prices.push(data.data.bpi[date]);
        sortedData.push({
          date: moment(date).format('MMM DD'),
          y: data.data.bpi[date]
        });
      }

      this.setState({ data: sortedData, lables, prices});
    });


    // Live price API
    const url = `https://blockchain.info/ticker`;
    const profit = axios.get(url);

    profit.then((data) => {
      // Sets exchange rate for 1 BTC
      this.setState({ liveRate: data.data.NZD.last })
      console.log(this.state.liveRate);
    }).catch((error) => {
      this.setState({ profit: "Fetching error, please try again!" })
    });
  }

  onRateChange = (event) => {
    this.setState({ rate: event.target.value })
  }

  onAmountChange = (event) => {
    this.setState({ amount: event.target.value })
  }

  calculateProfit = (event) => {
    event.preventDefault();

    // Profit gained or lost
    const profit = formatNumber(Math.round(((this.state.liveRate - this.state.rate) * this.state.amount) * 100) / 100);
    this.setState({ profit: `Profit: $${profit}` });


    // Percentage Change
    const diff = this.state.liveRate - this.state.rate;
    const percentage = Math.round((diff / this.state.rate * 100) * 100) / 100;
    this.setState({ changePercent: `Percentage: ${percentage}%`})
  }

  render() {

    return (
      <div className="App">

        <Row className="App-header">
          <h1 className="App-title">Bitcoin Profit Checker</h1>
        </Row>

        <div className="App-body">

          {/* GRAPH */}
          <GraphSection data={this.state.data} lables={this.state.lables} prices={this.state.prices} liveRate={this.state.liveRate} prev="10493.30"/>


          {/* INPUTS */}
          <div className="input">
            <Form onSubmit={this.calculateProfit} className="input-group">
                {/* Rate Brought */}
                  <input placeholder="Rate brought, 10493.30"
                    className="form-control"
                    onChange={this.onRateChange}
                  />


                {/* Amount brought */}
                  <input
                    placeholder="Amount owned, 0.02663076"
                    className="form-control"
                    onChange={this.onAmountChange}
                  />

                <button className="btn btn-success btn-primary">Calculate</button>
            </Form>
          </div>



          {/* TOTALS */}
          {this.state.profit != '' &&
            <div className="totals">
              <h3>Totals:</h3>
              {/* Profit */}
              <h3>{this.state.profit}</h3>
              {/* Percentage Change */}
              <h3>{this.state.changePercent}</h3>
            </div>
          }

          <Row className="App-Footer">
              <h6 className="center">By Krishna Kapadia</h6>
          </Row>

        </div>



      </div>
    );
  }
}

export default App;
