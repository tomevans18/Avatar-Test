import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Content from './Content';

describe('Content', () => {
  it('should render as expected ', () => {
    const wrapper = mount(
      <Content>
        <div>TEST CONTENT</div>
      </Content>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
