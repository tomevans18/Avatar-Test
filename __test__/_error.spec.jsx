import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import wrapWithTheme from '../lib/wrapWithTheme';

import ErrorPage from '../pages/_error';

let props;

describe('ErrorPage', () => {
  it('should render 404 as expected', async () => {
    props = await ErrorPage.getInitialProps({
      res: {
        statusCode: 404,
      },
    });
    const wrapper = wrapWithTheme(mount, <ErrorPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render other error as expected', async () => {
    props = await ErrorPage.getInitialProps({
      err: {
        statusCode: 500,
      },
    });
    const wrapper = wrapWithTheme(mount, <ErrorPage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
