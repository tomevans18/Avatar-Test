import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../pages/_app';

const mockRouterContext = jest.fn();
const mockRouterPush = jest.fn();
const mockTokenResponse = jest.fn();

jest.mock('next/router', () => ({
  makePublicRouterInstance: () => {},
  push: () => mockRouterPush(),
  withRouter: Component => props => <Component {...mockRouterContext()} {...props} />,
}));

jest.mock('next-cookies', () => () => mockTokenResponse());

const requiredProps = {
  user: {
    isLoggedIn: false,
    userName: null,
    status: 'Available',
    avatar: null,
    protectedPage: false,
  },
  protectedPage: false,
};

describe('App', () => {
  beforeEach(() => {
    mockRouterContext.mockReturnValue({
      router: {
        pathname: '/',
      },
    });

    mockTokenResponse.mockReturnValue({});
  });

  afterEach(() => {
    mockRouterContext.mockReset();
    mockTokenResponse.mockReset();
  });

  const MockComponent = () => <div>TEST</div>;

  it('should render as expected with no passed component', () => {
    const wrapper = mount(<App {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with passed component', async () => {
    const props = await App.getInitialProps({
      Component: MockComponent,
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render only reset styles', () => {
    MockComponent.noGlobalStyles = true;
    const wrapper = shallow(<App Component={MockComponent} {...requiredProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with all styles', () => {
    MockComponent.noGlobalStyles = false;
    const wrapper = shallow(<App Component={MockComponent} {...requiredProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass down to component getInitialProps', async () => {
    MockComponent.getInitialProps = jest.fn();
    const props = await App.getInitialProps({
      Component: MockComponent,
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(MockComponent.getInitialProps).toHaveBeenCalledTimes(1);
  });

  it('should render as expected with no layout passed with component', () => {
    const wrapper = shallow(<App Component={MockComponent} {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with layout passed with component', () => {
    MockComponent.layout = ({ Component, ...passedProps } = {}) => (
      <section>
        <Component {...passedProps} />
      </section>
    );
    const wrapper = shallow(<App Component={MockComponent} {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle user data fetch fail if a token is passed', async () => {
    mockTokenResponse.mockReturnValue({
      token: 'abc123',
    });
    MockComponent.getInitialProps = jest.fn();
    const props = await App.getInitialProps({
      Component: MockComponent,
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(MockComponent.getInitialProps).toHaveBeenCalledTimes(1);
  });

  it('should complete user data fetch if a token is passed', async () => {
    mockTokenResponse.mockReturnValue({
      token: 'abc123',
    });
    fetch.once(
      JSON.stringify({
        userName: 'Tom Evans',
        avatar: 'https://pbs.twimg.com/profile_images/1066699912425934848/ak1-6yzy_400x400.jpg',
        status: 'Available',
      })
    );

    MockComponent.getInitialProps = jest.fn();
    const props = await App.getInitialProps({
      Component: MockComponent,
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(MockComponent.getInitialProps).toHaveBeenCalledTimes(1);
  });

  it('should complete redirect server side if no token is passed and page is protected', async () => {
    MockComponent.getInitialProps = jest.fn();
    MockComponent.protected = true;
    const props = await App.getInitialProps({
      Component: MockComponent,
      ctx: {
        res: {
          writeHead: () => jest.fn(),
          end: () => jest.fn(),
        },
      },
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(MockComponent.getInitialProps).toHaveBeenCalledTimes(1);
  });

  it('should complete redirect client side if no token is passed and page is protected', async () => {
    MockComponent.getInitialProps = jest.fn();
    MockComponent.protected = true;
    const props = await App.getInitialProps({
      Component: MockComponent,
      ctx: {},
    });
    const wrapper = mount(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(MockComponent.getInitialProps).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
