import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import AccessibilityWrapper from './index';

import wrapWithTheme from '../../lib/wrapWithTheme';

const mockRemoveEventListener = jest.fn();
global.removeEventListener = mockRemoveEventListener;

const MockComponent = () => <div />;

describe('Accessibility Wrapper', () => {
  it('should initially render as expected', () => {
    const wrapper = mount(
      <AccessibilityWrapper>
        <MockComponent />
      </AccessibilityWrapper>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('tabbing')).toBeFalsy();
    expect(wrapper.prop('tabbing')).toBeFalsy();
  });

  it('should update on tab key press', () => {
    const wrapper = wrapWithTheme(
      mount,
      <AccessibilityWrapper>
        <MockComponent />
      </AccessibilityWrapper>
    );

    wrapper
      .first()
      .instance()
      .handleFirstTab({
        keyCode: 9,
      });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('tabbing')).toBeTruthy();
  });

  it('should not update on non tab key press', () => {
    const wrapper = wrapWithTheme(
      mount,
      <AccessibilityWrapper>
        <MockComponent />
      </AccessibilityWrapper>
    );

    wrapper
      .first()
      .instance()
      .handleFirstTab({
        keyCode: 12,
      });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('tabbing')).toBeFalsy();
  });

  it('should update on mouse click', () => {
    const wrapper = wrapWithTheme(
      mount,
      <AccessibilityWrapper>
        <MockComponent />
      </AccessibilityWrapper>
    );

    wrapper.first().setState({
      tabbing: true,
    });

    expect(wrapper.state('tabbing')).toBeTruthy();

    wrapper
      .first()
      .instance()
      .handleMouseDownOnce();

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.state('tabbing')).toBeFalsy();
  });

  it('should remove event listen on unmount', () => {
    const wrapper = mount(
      <AccessibilityWrapper>
        <MockComponent />
      </AccessibilityWrapper>
    );
    wrapper.unmount();
    global.expect(global.removeEventListener).toHaveBeenCalled();
  });
});
