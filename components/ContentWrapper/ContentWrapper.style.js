import styled, { css } from 'styled-components';

export default styled.div`
  ${p =>
    p.flex &&
    css`
      display: flex;
      flex-direction: row;
    `} position: relative;
  width: 100%;
  max-width: 67rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 calc(env(safe-area-inset-right) + ${p => p.theme.component.spacing});

  @supports (padding: max(0px)) {
    padding: 0 max(${p => p.theme.component.spacing}, env(safe-area-inset-left));
  }
`;
