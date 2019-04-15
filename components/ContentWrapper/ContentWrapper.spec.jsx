import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ContentWrapper from './ContentWrapper';

describe('Content Wrapper', () => {
  it('should render as expected', () => {
    const wrapper = shallow(
      <ContentWrapper>
        <div>TEST ContentWrapper</div>
      </ContentWrapper>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with flex layout', () => {
    const wrapper = shallow(
      <ContentWrapper flex>
        <div>TEST ContentWrapper</div>
      </ContentWrapper>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
