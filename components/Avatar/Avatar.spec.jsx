import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Avatar from './Avatar';

import wrapWithTheme from '../../lib/wrapWithTheme';

const requiredProps = {
  img: 'http://example.com',
  status: 'Available',
};

describe('Avatar', () => {
  it('should render as expected', () => {
    const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render loading percentage as expected', () => {
    const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} percentage={50} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  ['Available', 'Not Ready', 'Unavailable'].map(status =>
    it(`should render status "${status}" as expected`, () => {
      const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} status={status} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    })
  );

  it('should render with scale on hover', () => {
    const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} hoverScale />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should do nothing on click of button if no onClick function is passed', () => {
    const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} />);

    wrapper
      .find('button')
      .props()
      .onClick();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should run passed onClick function on click of button', () => {
    const onClickFunc = jest.fn();
    const wrapper = wrapWithTheme(mount, <Avatar {...requiredProps} onClick={onClickFunc} />);

    wrapper
      .find('button')
      .props()
      .onClick();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });
});
