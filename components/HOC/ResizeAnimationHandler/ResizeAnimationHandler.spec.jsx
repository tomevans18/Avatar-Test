import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ResizeAnimationHandler from './ResizeAnimationHandler';
import ResizeAnimationHandlerStyles from './ResizeAnimationHandler.style';

const mockRemoveEventListener = jest.fn();
global.removeEventListener = mockRemoveEventListener;

describe('Resize Animation Handler', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <ResizeAnimationHandler>
        <div />
      </ResizeAnimationHandler>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update state on window resize', () => {
    jest.useFakeTimers();
    const wrapper = shallow(
      <ResizeAnimationHandler>
        <div />
      </ResizeAnimationHandler>
    );
    expect(wrapper.state().resizing).toBeFalsy();
    global.dispatchEvent(new Event('resize'));
    expect(wrapper.state().resizing).toBeTruthy();
    jest.runAllTimers();
    expect(wrapper.state().resizing).toBeFalsy();
  });

  it('should not set state again and also clear timeout if already running', () => {
    jest.useFakeTimers();
    const wrapper = shallow(
      <ResizeAnimationHandler>
        <div />
      </ResizeAnimationHandler>
    );
    wrapper.setState({
      resizing: true,
    });
    expect(wrapper.state().resizing).toBeTruthy();
    global.dispatchEvent(new Event('resize'));
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(wrapper.state().resizing).toBeTruthy();
  });

  it('should remove event listen on unmount', () => {
    const wrapper = shallow(
      <ResizeAnimationHandler>
        <div />
      </ResizeAnimationHandler>
    );
    wrapper.unmount();
    global.expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should render styles correctly', () => {
    const wrapper = mount(<ResizeAnimationHandlerStyles />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render styles correctly on resize', () => {
    const wrapper = mount(<ResizeAnimationHandlerStyles resizing />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
