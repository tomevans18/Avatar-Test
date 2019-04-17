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
      <AppProviders
        user={{
          userName: 'Tom Evans',
          avatar: 'https://pbs.twimg.com/profile_images/1066699912425934848/ak1-6yzy_400x400.jpg',
          status: 'Available',
        }}
        protectedPage={false}
      >
        <MockComponent />
      </AppProviders>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
