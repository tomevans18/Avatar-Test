import React from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from '../ContentWrapper';

import BannerWrapper from './Banner.style';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Banner = ({ children }) => (
  <BannerWrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </BannerWrapper>
);

Banner.propTypes = propTypes;

export default Banner;
