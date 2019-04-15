import { configure as enzymeConfigure } from 'enzyme'; //eslint-disable-line
import Adapter from 'enzyme-adapter-react-16'; //eslint-disable-line
import fetch from 'jest-fetch-mock';
import configure from '@commercetools/enzyme-extensions';
import ShallowWrapper from 'enzyme/ShallowWrapper'; //eslint-disable-line

enzymeConfigure({
  adapter: new Adapter(),
});

global.fetch = fetch;

configure(ShallowWrapper);

jest.mock('next/link', () => ({ children }) => children);

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => 10,
  }),
});
