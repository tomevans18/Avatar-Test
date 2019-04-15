import { ThemeConsumer } from 'styled-components';
import theme from '../styles/theme';

export default (method, children, options, themeObject = theme) => {
  // eslint-disable-next-line no-underscore-dangle
  ThemeConsumer._currentValue = themeObject;
  return method(children, options);
};
