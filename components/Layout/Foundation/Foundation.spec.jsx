import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Foundation from './Foundation';

describe('Layout - Foundation', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <Foundation>
        <div>TEST CONTENT</div>
      </Foundation>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
