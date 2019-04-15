import { css } from 'styled-components';
import theme from './theme';

const {
  color: { black },
} = theme;

export default css`
  #nprogress {
    pointer-events: none;

    .bar {
      background: ${black};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
    }

    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      opacity: 1;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`;
