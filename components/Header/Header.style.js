import styled from 'styled-components';

import { multiply } from '../../styles/lib/calculate';

export default styled.header`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${p => p.theme.color.grey};
`;

export const SkipToMain = styled.a`
  left: -999px;
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -999;
  &:focus,
  &:active {
    left: auto;
    top: auto;
    overflow: auto;
    margin: 1rem 35%;
    z-index: 999;
    width: auto;
    height: auto;
    border: none;
    padding: ${p => `
      ${multiply(p.theme.component.padding, 0.8)}
      ${multiply(p.theme.component.padding, 1.15)}
      ${multiply(p.theme.component.padding, 0.8)}
      ${multiply(p.theme.component.padding, 1.15)}
    `};
    text-align: center;
    cursor: pointer;
  }
`;

export const LogoWrapper = styled.div`
  max-width: 200px;
`;

export const Logo = styled.a`
  display: block;
  padding: 0.75rem 0 0.5rem;
  max-width: 70vw;
  cursor: pointer;

  img {
    min-height: 65px;
    max-height: 10vh;
  }
`;

export const LoginBtn = styled.button``;
