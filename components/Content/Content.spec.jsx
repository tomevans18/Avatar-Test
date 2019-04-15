import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Content from './Content';

const passedProps = {
  passedComponentTest: 'test string',
};

describe('Content', () => {
  it('should render as expected ', () => {
    const wrapper = mount(
      <Content {...passedProps}>
        <div>TEST CONTENT</div>
      </Content>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
