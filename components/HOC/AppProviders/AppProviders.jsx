import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import theme from '../../../styles/theme';

import ResizeAnimationHandler from '../ResizeAnimationHandler';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ResizeAnimationHandler>{children}</ResizeAnimationHandler>
  </ThemeProvider>
);

AppProviders.propTypes = propTypes;

export default AppProviders;
