import React from 'react';
import PropTypes from 'prop-types';

import Div from './Content.style';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Content = props => {
  const { children, ...otherProps } = props;
  return <Div {...otherProps}>{children}</Div>;
};

Content.propTypes = propTypes;

export default Content;
