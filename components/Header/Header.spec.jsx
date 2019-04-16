import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import wrapWithTheme from '../../lib/wrapWithTheme';

import Header from './Header';

describe('Header', () => {
  it('should render as expected ', () => {
    const wrapper = wrapWithTheme(mount, <Header />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
