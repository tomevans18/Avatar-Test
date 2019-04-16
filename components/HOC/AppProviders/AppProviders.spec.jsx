import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AppProviders from './AppProviders';

let MockComponent;

describe('App Provider', () => {
  beforeEach(() => {
    MockComponent = () => <div />;
  });

  it('should render as expected', () => {
    const wrapper = shallow(
      <AppProviders>
        <MockComponent />
      </AppProviders>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
