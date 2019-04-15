import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Header from '../../Header';
import Content from '../../Content';
import Footer from '../../Footer';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

const Foundation = props => {
  const { children } = props;
  return (
    <Fragment>
      <Header mainId="#mainContent" />
      <Content id="mainContent" tabIndex="-1">
        {children}
      </Content>
      <Footer />
    </Fragment>
  );
};

Foundation.propTypes = propTypes;

export default Foundation;
