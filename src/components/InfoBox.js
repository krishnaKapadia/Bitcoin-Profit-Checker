import React, { Component } from 'react';
import '../style/InfoBox.css';

/* The live rate is passed in as a prop, while the monthly price and Percentage
  change are fetched in here */

class InfoBox extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   currentPrice: '', monthChangeD: 'loading..', monthChangeP: 'loading..'
    // }
  }

  componentDidMount() {
//     const {data} = this.props;
//       const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
//
//       console.log(data);
//
//       fetch(url).then(r => r.json())
//         .then((bitcoinData) => {
//           const price = bitcoinData.bpi.USD.rate_float;
//           const change = price - data[0].y;
//           const changeP = (price - data[0].y) / data[0].y * 100;
//
//           this.setState({
//             currentPrice: bitcoinData.bpi.USD.rate_float,
//             monthChangeD: change.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
//             monthChangeP: changeP.toFixed(2) + '%',
//             updatedAt: bitcoinData.time.updated
//           })
//         })
//         .catch((e) => {
//           console.log(e);
// });
  }

  render() {
    return (
      <div className="data-container">

        <div id="left" className="box">
          <div className="heading">${this.props.liveRate}</div>
          <div className="subtext">Current rate, NZD</div>
        </div>

        <div id="center" className="box">
          {/* <div className="heading">{this.state.monthChangeD}</div> */}
          <div className="subtext">Change since last month, $</div>
        </div>

        <div id="right" className="box">
          {/* <div className="heading">{this.state.monthChangeP}</div> */}
          <div className="subtext">Change since last month, %</div>
        </div>

      </div>

    );
  }

}

export default InfoBox;
