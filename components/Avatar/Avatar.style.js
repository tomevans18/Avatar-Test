import styled, { css } from 'styled-components';
import Donut from '../Donut';

export const Avatar = styled.button`
  position: relative;
  background: ${p => p.theme.color.grey};
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  text-indent: -9999px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  transition: border 0.25s ease-in-out;
  border: 0.25rem solid
    ${p =>
      p.percentage > 0 && p.percentage !== 100 ? p.theme.color.grey : p.theme.color[p.status]};
  z-index: 996;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${p => p.theme.color[p.status]};
    opacity: ${p => (p.status === 'notReady' ? '0.4' : '0')};
    transition: opacity 0.25s ease-in-out;
    z-index: 2;
  }
`;

export const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  filter: ${p => (p.status === 'unavailable' ? 'grayscale(100%)' : null)};
  transition: filter 0.25s ease-in-out;
`;

export const LoadingState = styled(Donut)`
  position: absolute;
  width: 3rem;
  height: 3rem;
  opacity: ${p => (p.percentage > 0 && p.percentage !== 100 ? '1' : '0')};
  transform: scale(${p => (p.percentage > 0 && p.percentage !== 100 ? '1.1' : '1')});
  transition: opacity 0.25s ease-in-out, opacity 0.25s ease-in-out;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  transition: transform 0.25s ease-in-out;

  & + & {
    margin-top: 0.75rem;
  }

  ${p =>
    p.hoverScale &&
    css`
      &:hover {
        transform: scale(1.075);
      }
    `}
`;

export default Avatar;
