import React, { Component } from 'react';
import '../style/InfoBox.css';
import { formatNumber } from '../utils/utils';
import FaArrowUp from 'react-icons/lib/fa/sort-asc';
import FaArrowDown from 'react-icons/lib/fa/sort-desc';

/* The live rate is passed in as a prop, while the monthly price and Percentage
  change are fetched in here */

class InfoBox extends Component {

  render() {
    return (
      <div className="data-container">

        <div id="left" className="box">
          <div className="heading">${formatNumber(this.props.liveRate)}</div>
          <div className="subtext">Current rate, 1 BTC/NZD</div>
        </div>

        <div id="center" className="box">
          <div className="heading">
            ${formatNumber(this.props.monthChangeD)}
            {(this.props.monthChangeD > 0) && <FaArrowUp className="arrowUp"/> }
            {(this.props.monthChangeD < 0) && <FaArrowDown className="arrowDown" />}
          </div>
          <div className="subtext">Change since last month, $</div>
        </div>

        <div id="right" className="box">
          <div className="heading">
            {this.props.monthChangeP}%
            {(this.props.monthChangeD > 0) && <FaArrowUp className="arrowUp"/> }
            {(this.props.monthChangeD < 0) && <FaArrowDown className="arrowDown" />}
          </div>
          <div className="subtext">Change since last month, %</div>
        </div>

      </div>

    );
  }

}

export default InfoBox;
