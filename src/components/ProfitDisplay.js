import React, { Component } from 'react';
import { formatNumber } from '../utils/utils';
import FaArrowUp from 'react-icons/lib/fa/sort-asc';
import FaArrowDown from 'react-icons/lib/fa/sort-desc';

class ProfitDisplay extends Component {

  render() {
    return (
      <div className="totals">
        <h3 className="heading center marginBottom">Totals:</h3>

        <div>
          <h4>
            Profit: ${formatNumber(this.props.profit)}
            {(this.props.profit > 0) && <FaArrowUp className="arrowUp"/> }
            {(this.props.profit < 0) && <FaArrowDown className="arrowDown" />}
          </h4>
        </div>

        {/* Percentage Change */}
        <div>
          <h4>
            Change %: {formatNumber(this.props.changePercent)}%
            {(this.props.changePercent > 0) && <FaArrowUp className="arrowUp"/> }
            {(this.props.changePercent < 0) && <FaArrowDown className="arrowDown" />}
          </h4>
        </div>

        {/* Second Percentage Change */}

        {this.props.changePercent2 != '' &&
          <div>
            <h4>
              Change %: {formatNumber(this.props.changePercent2)}%
              {(this.props.changePercent2 > 0) && <FaArrowUp className="arrowUp"/> }
              {(this.props.changePercent2 < 0) && <FaArrowDown className="arrowDown" />}
            </h4>
          </div>
        }


      </div>
    );
  }

}

export default ProfitDisplay;
