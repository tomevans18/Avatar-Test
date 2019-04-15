import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ContentWrapper from '../ContentWrapper';

import StyledHeader, { SkipToMain, LogoWrapper, Logo } from './Header.style';

const propTypes = {
  mainId: PropTypes.string.isRequired,
};

const Header = ({ mainId }) => (
  <StyledHeader>
    <SkipToMain href={mainId}>Skip to main content</SkipToMain>
    <ContentWrapper flex>
      <LogoWrapper>
        <Link href="/">
          <Logo aria-label="Home">
            <img className="site-logo" src="https://via.placeholder.com/175x90" alt="Logo" />
          </Logo>
        </Link>
      </LogoWrapper>
    </ContentWrapper>
  </StyledHeader>
);

Header.propTypes = propTypes;

export default Header;
