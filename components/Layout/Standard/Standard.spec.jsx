import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import wrapWithTheme from '../../../lib/wrapWithTheme';

import Standard from './Standard';

const requiredProps = {
  content: () => <div>TEST CONTENT</div>,
};

describe('Layout - Standard', () => {
  it('should render as expected with only required props', () => {
    const wrapper = wrapWithTheme(mount, <Standard {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with left sidebar only', () => {
    const wrapper = wrapWithTheme(
      mount,
      <Standard
        {...{
          ...requiredProps,
          leftSidebar: () => <div>TEST LEFT ASIDE</div>,
        }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render as expected with all props', () => {
    const wrapper = wrapWithTheme(
      mount,
      <Standard
        {...{
          ...requiredProps,
          pageTitle: 'TEST TITLE',
          banner: () => <div>TEST BANNER</div>,
          leftSidebar: () => <div>TEST LEFT ASIDE</div>,
          rightSidebar: () => <div>TEST RIGHT ASIDE</div>,
          addSpacing: true,
          stretchMain: true,
          stretchLeft: true,
          stretchRight: true,
        }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
