import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from './index.style';

class Index extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
  };

  state = {
    tabbing: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleFirstTab.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleFirstTab.bind(this));
    window.removeEventListener('mousedown', this.handleMouseDownOnce.bind(this));
  }

  handleFirstTab = e => {
    if (e.keyCode === 9) {
      this.setState({
        tabbing: true,
      });

      window.removeEventListener('keydown', this.handleFirstTab.bind(this));
      window.addEventListener('mousedown', this.handleMouseDownOnce.bind(this));
    }
  };

  handleMouseDownOnce = () => {
    this.setState({
      tabbing: false,
    });

    window.removeEventListener('mousedown', this.handleMouseDownOnce.bind(this));
    window.addEventListener('keydown', this.handleFirstTab.bind(this));
  };

  render() {
    const { children } = this.props;
    const { tabbing } = this.state;
    return <Content tabbing={tabbing}>{children}</Content>;
  }
}

export default Index;
