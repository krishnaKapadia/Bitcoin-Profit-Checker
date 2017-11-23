import React, { Component } from 'react';
import '../style/App.css';
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import GraphSection from './GraphSection';
import InfoBox from './InfoBox';
import ProfitDisplay from './ProfitDisplay';
import moment from 'moment';

class App extends Component {

  constructor(props){
    super(props);

    this.state = { data: [], rate: '', amount: '', prevMonthRate: '', monthChangeD: '', monthChangeP: '',
        liveRate: '' , profit: '', changePercent: '', changePercent2: '', lastInvestment: '',
        investment1: { rate: '10493.30', amount: '0.02663076'},
        investment2: { rate: '11940.72', amount: '0.02427909'}
      };
  }

  componentDidMount() {
    // const url = `https://api.coindesk.com/v1/bpi/historical/close.json`

    // historical data API
    const result = axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=nzd&index=nzd');

    result.then((data) => {
      const sortedData = [];

      for(let date in data.data.bpi){
        sortedData.push({
          date: moment(date).format('MMM DD'),
          price: data.data.bpi[date]
        });
      }

      const prevMonthRate = sortedData[0].price;
      this.setState({ data: sortedData, prevMonthRate });

      // Live price API
      const url = `https://blockchain.info/ticker`;
      const profit = axios.get(url);

      profit.then((data) => {
        // Sets exchange rate for 1 BTC
        const liveRate = data.data.NZD.last

        // Calculates the dollar change based off previous month
        const monthChangeD = Math.round((liveRate - this.state.prevMonthRate) * 100) / 100;

        //Calculates the monthly percent change
        const monthChangeP = Math.round((monthChangeD / this.state.prevMonthRate) * 100)

        //Sets all calculated values
        this.setState({ liveRate, monthChangeD, monthChangeP })

      }).catch((error) => {
        this.setState({ profit: "Fetching error, please try again!" })
      });

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

    if(this.state.rate === '0' && this.state.amount === '0'){
      this.calculateProfitOverall(event);
    } else {
      this.setState({ changePercent2 : '' });
      // Profit gained or lost
      const profit = Math.round(((this.state.liveRate - this.state.rate) * this.state.amount) * 100) / 100;
      this.setState({ profit });


      // Percentage Change
      const diff = this.state.liveRate - this.state.rate;
      const percentage = Math.round((diff / this.state.rate * 100) * 100) / 100;
      this.setState({ changePercent: percentage })
    }
  }

  calculateProfitOverall = (event) => {
    event.preventDefault();

    const profit1 = Math.round(((this.state.liveRate - this.state.investment1.rate) * this.state.investment1.amount) * 100) / 100;
    const profit2 = Math.round(((this.state.liveRate - this.state.investment2.rate) * this.state.investment2.amount) * 100 ) / 100;
    const totalProfit = profit1 + profit2;
    this.setState( { profit: totalProfit });

    const diff1 = this.state.liveRate - this.state.investment1.rate;
    const percentage1 = Math.round((diff1 / this.state.investment1.rate * 100) * 100) / 100;
    this.setState({ changePercent: percentage1 })

    const diff2 = this.state.liveRate - this.state.investment2.rate;
    const percentage2 = Math.round((diff2 / this.state.investment2.rate * 100) * 100) / 100;
    this.setState({ changePercent2: percentage2 })
  }

  render() {

    return (
      <div className="App">

        <Row className="App-header">
          <h1 className="App-title">Bitcoin Profit Checker</h1>
        </Row>

        <div className="App-body">


          {/* INFO BOX SECTION */}
          <div className="row">
            <InfoBox data={this.state.data} liveRate={this.state.liveRate}
                    monthChangeD={this.state.monthChangeD} monthChangeP={this.state.monthChangeP} />
          </div>


          {/* GRAPH */}
          <GraphSection data={this.state.data} liveRate={this.state.liveRate} prev="10493.30" />

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
          {this.state.profit !== '' &&
          <ProfitDisplay profit={this.state.profit} changePercent={this.state.changePercent} changePercent2={this.state.changePercent2}/> }

          <Row className="App-Footer">
              <h4 className="center">Created by <a href="http://krishnakapadia.com">Krishna Kapadia</a></h4>
          </Row>

        </div>


      </div>
    );
  }
}

export default App;
