import React from 'react';
import PropTypes from 'prop-types';

import Content from './ContentWrapper.style';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const ContentWrapper = ({ children, ...otherProps }) => (
  <Content {...otherProps}>{children}</Content>
);

ContentWrapper.propTypes = propTypes;

export default ContentWrapper;
