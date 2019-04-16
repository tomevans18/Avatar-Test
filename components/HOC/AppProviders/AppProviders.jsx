import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';

import { UserProvider } from '../User';
import ResizeAnimationHandler from '../ResizeAnimationHandler';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  user: PropTypes.shape().isRequired,
  protectedPage: PropTypes.bool.isRequired,
};

const AppProviders = ({ children, user, protectedPage }) => (
  <ThemeProvider theme={theme}>
    <UserProvider user={user} protectedPage={protectedPage}>
      <ResizeAnimationHandler>{children}</ResizeAnimationHandler>
    </UserProvider>
  </ThemeProvider>
);

AppProviders.propTypes = propTypes;

export default AppProviders;
