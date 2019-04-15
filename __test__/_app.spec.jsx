import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../pages/_app';

const mockRouterContext = jest.fn();

jest.mock('next/router', () => ({
  events: {
    on: () => {},
  },
  makePublicRouterInstance: () => {},
  withRouter: Component => props => <Component {...mockRouterContext()} {...props} />,
}));

describe('App', () => {
  beforeEach(() => {
    mockRouterContext.mockReturnValue({
      router: {
        pathname: '/',
      },
    });
  });

  afterEach(() => {
    mockRouterContext.mockReset();
  });

  const MockComponent = () => <div>TEST</div>;

  it('should render as expected with no passed component', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with passed component', () => {
    const wrapper = shallow(<App Component={MockComponent} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render only reset styles', () => {
    MockComponent.noGlobalStyles = true;
    const wrapper = shallow(<App Component={MockComponent} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
