import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { withUserContext } from '../HOC/User';

import ContentWrapper from '../ContentWrapper';
import UserStatus from '../UserStatus';

import StyledHeader, { SkipToMain, LogoWrapper, Logo, NavLink, LoginBtn } from './Header.style';

const propTypes = {
  mainId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const Header = ({ mainId, isLoggedIn, login, logout }) => (
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
      {isLoggedIn && (
        <Fragment>
          <Link href="/profile" passHref>
            <NavLink>Profile</NavLink>
          </Link>
          <UserStatus />
        </Fragment>
      )}
      <LoginBtn type="button" onClick={() => (isLoggedIn ? logout() : login())}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </LoginBtn>
    </ContentWrapper>
  </StyledHeader>
);

Header.propTypes = propTypes;

export default withUserContext(Header);
