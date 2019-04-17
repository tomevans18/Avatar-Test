import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserStatus from './UserStatus';

import wrapWithTheme from '../../lib/wrapWithTheme';

const requiredProps = {
  status: 'Available',
  avatar: 'http://example.com',
};

const mapRemoveEvents = {};
window.removeEventListener = jest.fn((event, cb) => {
  mapRemoveEvents[event] = cb;
});

describe('UserStatus', () => {
  it('should render as expected', () => {
    const wrapper = wrapWithTheme(mount, <UserStatus {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected when open', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));

    wrapper.setState({ showDropdown: true, isOpen: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should remove event listener on unmount', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    const map = {};
    document.removeEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    wrapper.instance().componentWillUnmount();
    expect(Object.keys(map)).toContain('mousedown');
  });

  it('should toggle state to true and add event listener', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    expect(wrapper.state().isOpen).toBe(false);
    expect(wrapper.state().showDropdown).toBe(false);

    wrapper.instance().handleToggle();

    expect(wrapper.state().showDropdown).toBe(true);
    expect(wrapper.state().isOpen).toBe(true);
    expect(Object.keys(map)).toContain('mousedown');
  });

  it('should cleartimeout if already running', () => {
    const spyClearTimeout = jest.spyOn(window, 'clearTimeout');
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    expect(wrapper.state().showDropdown).toBe(false);

    wrapper.instance().handleShowDropdownOut();
    wrapper.instance().handleShowDropdownOut();

    expect(spyClearTimeout).toHaveBeenCalledTimes(1);
    spyClearTimeout.mockClear();
  });

  it('should increment percentage increase', () => {
    jest.useFakeTimers();
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    expect(wrapper.state().percentage).toBe(0);

    wrapper.instance().percentageIncrease();
    jest.runAllTimers();

    expect(wrapper.state().percentage).toBeGreaterThan(0);
    wrapper.setState({
      percentage: 90,
    });
  });

  it('shoud update status and start loader', () => {
    const newStatus = 'Unavailable';
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));

    expect(wrapper.state().loadingStatus).toBe(null);

    wrapper.instance().updateStatus(newStatus);

    expect(wrapper.state().loadingStatus).toBe(newStatus);
    expect(wrapper.state().percentage).toBeGreaterThan(0);
  });

  it('should exit update status if already running', () => {
    const newStatus = 'Unavailable';
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));

    wrapper.setState({
      loadingStatus: newStatus,
    });
    expect(wrapper.state().loadingStatus).toBe(newStatus);
    expect(wrapper.state().percentage).toBe(0);

    wrapper.instance().updateStatus(newStatus);

    expect(wrapper.state().loadingStatus).toBe(newStatus);
    expect(wrapper.state().percentage).toBe(0);
  });

  it('should clear complete update timeout and abort fetch if already running', () => {
    const spyClearTimeout = jest.spyOn(window, 'clearTimeout');
    const newStatus = 'Available';
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));

    spyClearTimeout.mockClear();

    wrapper.instance().updateStatus('Unavailable');
    wrapper.instance().updateStatus(newStatus);

    expect(wrapper.state().loadingStatus).toBe(newStatus);
    expect(wrapper.state().percentage).toBeGreaterThan(0);
    expect(spyClearTimeout).toHaveBeenCalledTimes(2);

    spyClearTimeout.mockClear();
  });

  it('should run close method if user clicks outside', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    const spyCloseDropdown = jest.spyOn(wrapper.instance(), 'closeDropdown');

    wrapper.instance().handleClickOutside({
      target: null,
    });
    expect(spyCloseDropdown).toHaveBeenCalledTimes(1);
    spyCloseDropdown.mockClear();
  });

  it('should return if user clicks withing component', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    const spyCloseDropdown = jest.spyOn(wrapper.instance(), 'closeDropdown');

    wrapper.instance().handleClickOutside({
      target: wrapper.instance().userStatusWrapperRef.current,
    });

    expect(spyCloseDropdown).toHaveBeenCalledTimes(0);
    spyCloseDropdown.mockClear();
  });

  it('should run close dropdown method', () => {
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    wrapper.setState({ showDropdown: true, isOpen: true });
    const spyCloseDropdown = jest.spyOn(wrapper.instance(), 'closeDropdown');

    expect(wrapper.state().isOpen).toBe(true);

    wrapper.instance().handleToggle();

    expect(wrapper.state().isOpen).toBe(false);
    expect(wrapper.state().isOpen).toBe(false);
    expect(spyCloseDropdown).toHaveBeenCalledTimes(1);
  });

  it('should set should dropdown to true', () => {
    jest.useFakeTimers();
    const wrapper = wrapWithTheme(mount, shallow(<UserStatus {...requiredProps} />).get(0));
    expect(wrapper.state().showDropdown).toBe(false);

    wrapper.instance().handleShowDropdownOut();
    jest.runAllTimers();

    // force callstack order
    setTimeout(() => expect(wrapper.state().showDropdown).toBe(true), 0);
  });
});
