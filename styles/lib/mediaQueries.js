import { css } from 'styled-components';
import theme from '../theme';

const { breakpoint } = theme;
let { printView } = theme;

if (typeof printView === 'undefined') printView = 0;

const mediaQuery = breakpointValue => (...rules) =>
  css`
    @media (min-width: ${breakpointValue}px) {
      ${css(...rules)}
    }
    ${breakpointValue <= printView
      ? css`
          @media print {
            ${css(...rules)}
          }
        `
      : ''}
  `;

const mediaQueries = {};

Object.keys(breakpoint).forEach(breakpointKey => {
  mediaQueries[breakpointKey] = mediaQuery(breakpoint[breakpointKey]);
});

mediaQueries.print = (...rules) => css`
  @media print {
    ${css(...rules)}
  }
`;

export default mediaQueries;
