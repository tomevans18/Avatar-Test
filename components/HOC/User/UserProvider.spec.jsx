import React from 'react';
import { mount } from 'enzyme';

import UserProvider from './UserProvider';

const requiredProps = {
  user: {},
  protectedPage: false,
};

const mockRouterPush = jest.fn();

jest.mock('next/router', () => ({
  push: () => mockRouterPush(),
}));

describe('UserProvider', () => {
  it('should cleanup on unmount', () => {
    const wrapper = mount(
      <UserProvider {...requiredProps}>
        <div />
      </UserProvider>
    );
    const map = {};
    window.removeEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    wrapper.instance().componentWillUnmount();
    expect(Object.keys(map)).toContain('storage');
  });

  it('should run sync login', () => {
    const wrapper = mount(
      <UserProvider {...requiredProps}>
        <div />
      </UserProvider>
    );
    const spyLogin = jest.spyOn(wrapper.instance(), 'login');

    wrapper.instance().syncSession({
      key: 'login',
    });

    expect(spyLogin).toHaveBeenCalledTimes(1);
  });

  it('should run sync logout', () => {
    const wrapper = mount(
      <UserProvider {...requiredProps}>
        <div />
      </UserProvider>
    );
    const spyLogout = jest.spyOn(wrapper.instance(), 'logout');

    wrapper.instance().syncSession({
      key: 'logout',
    });

    expect(spyLogout).toHaveBeenCalledTimes(1);
  });

  it('should run sync logout and redirect as protected', () => {
    const wrapper = mount(
      <UserProvider
        {...{
          ...requiredProps,
          protectedPage: true,
        }}
      >
        <div />
      </UserProvider>
    );
    const spyLogout = jest.spyOn(wrapper.instance(), 'logout');

    wrapper.instance().syncSession({
      key: 'logout',
    });

    expect(spyLogout).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
