import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Document from '../pages/_document';

describe('Document', () => {
  let wrapper;
  let EnhancedApp;

  beforeEach(async () => {
    const props = await Document.getInitialProps({
      renderPage: (...args) => {
        EnhancedApp = args[0].enhanceApp;
        return args;
      },
    });
    wrapper = shallow(<Document {...props} />);
  });

  it('should render as expected', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should create correct enhanced app', () => {
    wrapper = shallow(<EnhancedApp />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
