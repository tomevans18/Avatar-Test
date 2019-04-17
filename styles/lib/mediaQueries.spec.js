import media from './mediaQueries';
import theme from '../theme';

jest.mock('../theme', () => ({
  breakpoint: {
    small: 350,
    medium: 450,
    large: 650,
    extraLarge: 850,
  },
  printView: 650,
}));

describe('Media Queries', () => {
  Object.keys(theme.breakpoint).map(breakpoint =>
    it(`should output correct ${breakpoint} breakpoint media query with print media query if required`, () => {
      const output = media[breakpoint]`
        display: block;
      `
        .join('')
        .replace(/\s\s/g, '')
        .trim();

      expect(output).toEqual(
        `@media (min-width: ${theme.breakpoint[breakpoint]}px) {display: block;}${
          theme.breakpoint[breakpoint] <= theme.printView ? '@media print {display: block;}' : ''
        }`
      );
    })
  );

  it('should output the correct print media query', () => {
    const output = media.print`
                  display: block;
                  `
      .join('')
      .replace(/\s\s/g, '')
      .trim();
    expect(output).toEqual('@media print {display: block;}');
  });
});
