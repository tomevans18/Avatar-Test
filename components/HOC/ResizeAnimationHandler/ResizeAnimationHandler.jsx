import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AnimationHandler from './ResizeAnimationHandler.style';

class ResizeAnimationHandler extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
  };

  state = {
    resizing: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize.bind(this));
  }

  handleWindowResize = () => {
    const { resizing } = this.state;

    if (typeof this.timeout !== 'undefined') clearTimeout(this.timeout);

    if (!resizing) {
      this.setState({
        resizing: true,
      });
    }

    this.timeout = setTimeout(() => {
      this.setState({
        resizing: false,
      });
    }, 200);
  };

  render() {
    const { children } = this.props;
    const { resizing } = this.state;
    return <AnimationHandler resizing={resizing}>{children}</AnimationHandler>;
  }
}

export default ResizeAnimationHandler;
