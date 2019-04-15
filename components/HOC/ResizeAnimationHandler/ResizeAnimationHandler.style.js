import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${p =>
    p.resizing &&
    css`
      * {
        transition: none !important;
      }
    `};
`;
