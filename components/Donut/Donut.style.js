import styled from 'styled-components';

export default styled.div`
  circle {
    fill: none;
  }
`;

export const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

export const Background = styled.circle`
  stroke: ${p => p.theme.color[p.background]};
  stroke-width: 30px;
`;

export const Percentage = styled.circle`
  stroke: ${p => p.theme.color[p.foreground]};
  stroke-width: 30px;
  stroke-dasharray: 629px;
  stroke-dashoffset: 629px;
  transition: stroke-dashoffset 0.5s ease;
  stroke-dashoffset: ${p => 628 * (1 - p.percentage / 100)}px;
`;
