import React from 'react';
import PropTypes from 'prop-types';

import DonutChart, { SVG, Background, Percentage } from './Donut.style';

const propTypes = {
  background: PropTypes.string,
  foreground: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  background: 'grey_light',
  foreground: 'black',
  className: null,
};

function Donut({ background, foreground, percentage, className }) {
  return (
    <DonutChart className={className}>
      <SVG viewBox="0 0 333 333" enableBackground="new 0 0 333 333" xmlSpace="preserve">
        <g transform="translate(166, 166), scale(1.445)">
          <Background r="100" className="circle-back" background={background} />
          <Percentage
            r="100"
            transform="rotate(270.1)"
            foreground={foreground}
            percentage={percentage}
          />
        </g>
      </SVG>
    </DonutChart>
  );
}

Donut.propTypes = propTypes;
Donut.defaultProps = defaultProps;

export default Donut;
