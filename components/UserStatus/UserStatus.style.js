import styled, { keyframes } from 'styled-components';
import { multiply } from '../../styles/lib/calculate';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export default styled.div`
  position: relative;
  margin: auto 0.25rem auto 2rem;
`;

const arrowSize = '0.6rem';
export const DropDown = styled.div`
  position: absolute;
  top: calc(100% + ${multiply(arrowSize, 0.5)} + 2px);
  left: 50%;
  padding: 0.75rem;
  background: ${p => p.theme.color.background};
  transform: translateX(-50%);
  animation: ${fadeIn} 0.15s ease-in-out;
  opacity: ${p => (p.isOpen ? '1' : '0')};
  transition: opacity 0.25s ease-in-out;
  border-radius: 4%;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  z-index: 996;

  &:before {
    content: '';
    position: absolute;
    top: -${multiply(arrowSize, 0.5)};
    width: ${arrowSize};
    height: ${arrowSize};
    left: calc(50% - ${multiply(arrowSize, 0.5)});
    background: ${p => p.theme.color.background};
    transform: rotate(45deg);
  }
`;
