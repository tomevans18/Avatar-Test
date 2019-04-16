import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import wrapWithTheme from '../../lib/wrapWithTheme';

import Footer from './Footer';

describe('Footer', () => {
  it('should render as expected ', () => {
    const wrapper = wrapWithTheme(mount, <Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
