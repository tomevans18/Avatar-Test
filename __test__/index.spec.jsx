import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../pages';

import wrapWithTheme from '../lib/wrapWithTheme';

it('should render as expected with no passed component', () => {
  const wrapper = wrapWithTheme(mount, <Home />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
