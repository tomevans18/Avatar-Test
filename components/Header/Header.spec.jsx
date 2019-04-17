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
});
