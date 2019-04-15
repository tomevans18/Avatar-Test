import { css } from 'styled-components';
import { stripUnit } from 'polished';

export default (responsive, min, max = false, fallback = false) => {
  const responsiveUnitless = stripUnit(responsive);
  const minBreakpoint = ((stripUnit(min) * 16) / responsiveUnitless) * 100;
  const maxBreakpoint = ((stripUnit(max) * 16) / responsiveUnitless) * 100;

  const maxMediaQuery = css`
    @media (min-width: ${maxBreakpoint}px) {
      font-size: ${max};
    }
  `;

  return css`
    @media (max-width: ${minBreakpoint}px) {
      font-size: ${min};
    }
    ${max && maxMediaQuery};
    ${fallback &&
      css`
        font-size: ${fallback};
      `}
    font-size: ${responsive};
  `;
};
