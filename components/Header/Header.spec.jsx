import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import wrapWithTheme from '../../lib/wrapWithTheme';

import Header from './Header';

const mockRouterContext = jest.fn();
const mockUserContextContext = jest.fn();

jest.mock('next/router', () => ({
  withRouter: Component => props => <Component {...mockRouterContext()} {...props} />,
}));

jest.mock('../HOC/User', () => ({
  withUserContext: Component => props => <Component {...mockUserContextContext()} {...props} />,
}));

describe('Header', () => {
  beforeEach(() => {
    mockRouterContext.mockReturnValue({
      router: {
        pathname: '/',
      },
    });
  });

  afterEach(() => {
    mockRouterContext.mockReset();
    mockUserContextContext.mockReset();
  });

  it('should render as expected when logged in', () => {
    mockUserContextContext.mockReturnValue({
      isLoggedIn: true,
      userName: 'Tom Evans',
      avatar: 'http://example.com',
      status: 'Available',
      login: () => {},
      logout: () => {},
    });
    const wrapper = wrapWithTheme(mount, <Header mainId="#abc123" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected when logged out', () => {
    mockUserContextContext.mockReturnValue({
      isLoggedIn: false,
      userName: null,
      status: 'Available',
      avatar: null,
      protectedPage: false,
      login: () => {},
      logout: () => {},
    });
    const wrapper = wrapWithTheme(mount, <Header mainId="#abc123" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should run logout function when button is clicked and user is logged in', () => {
    const loginMockFunc = jest.fn();
    const logoutMockFunc = jest.fn();
    mockUserContextContext.mockReturnValue({
      isLoggedIn: true,
      userName: 'Tom Evans',
      avatar: 'http://example.com',
      status: 'Available',
      login: loginMockFunc,
      logout: logoutMockFunc,
    });
    const wrapper = wrapWithTheme(mount, <Header mainId="#abc123" />);

    wrapper
      .find('button')
      .last()
      .props()
      .onClick();

    expect(loginMockFunc).toHaveBeenCalledTimes(0);
    expect(logoutMockFunc).toHaveBeenCalledTimes(1);
  });

  it('should run login function when button is clicked and user is logged out', () => {
    const loginMockFunc = jest.fn();
    const logoutMockFunc = jest.fn();
    mockUserContextContext.mockReturnValue({
      isLoggedIn: false,
      userName: null,
      status: 'Available',
      avatar: null,
      protectedPage: false,
      login: loginMockFunc,
      logout: logoutMockFunc,
    });
    const wrapper = wrapWithTheme(mount, <Header mainId="#abc123" />);

    wrapper
      .find('button')
      .last()
      .props()
      .onClick();

    expect(loginMockFunc).toHaveBeenCalledTimes(1);
    expect(logoutMockFunc).toHaveBeenCalledTimes(0);
  });

  it('should render with profile link in bold', () => {
    mockRouterContext.mockReturnValue({
      router: {
        pathname: '/profile',
      },
    });
    mockUserContextContext.mockReturnValue({
      isLoggedIn: true,
      userName: 'Tom Evans',
      avatar: 'http://example.com',
      status: 'Available',
      login: () => {},
      logout: () => {},
    });
    const wrapper = wrapWithTheme(mount, <Header mainId="#abc123" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
