import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../pages/_app';

const mockRouterContext = jest.fn();

jest.mock('next/router', () => ({
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
    const wrapper = mount(<App />);
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
    const wrapper = shallow(<App Component={MockComponent} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with all styles', () => {
    MockComponent.noGlobalStyles = false;
    const wrapper = shallow(<App Component={MockComponent} />);

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
    const wrapper = shallow(<App Component={MockComponent} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with layout passed with component', () => {
    MockComponent.layout = ({ Component, ...passedProps } = {}) => (
      <section>
        <Component {...passedProps} />
      </section>
    );
    const wrapper = shallow(<App Component={MockComponent} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
