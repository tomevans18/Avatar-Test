import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Profile from '../pages/profile';

import wrapWithTheme from '../lib/wrapWithTheme';

it('should render as expected with no passed component', () => {
  const wrapper = wrapWithTheme(mount, <Profile />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
