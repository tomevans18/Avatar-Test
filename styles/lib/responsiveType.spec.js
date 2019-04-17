import responsiveType from './responsiveType';

describe('Responsive Type', () => {
  it('should output expected with only min value', () => {
    const output1 = responsiveType('6vw', '3em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    const output2 = responsiveType('5vw', '2.6em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    expect(output1).toEqual('@media (max-width: 800px) {font-size: 3em;};font-size: 6vw;');
    expect(output2).toEqual('@media (max-width: 832px) {font-size: 2.6em;};font-size: 5vw;');
  });

  it('should output expected with min and max value', () => {
    const output1 = responsiveType('6vw', '3em', '4em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    const output2 = responsiveType('5vw', '2.6em', '3.33333em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    expect(output1).toEqual(
      '@media (max-width: 800px) {font-size: 3em;}@media (min-width: 1066.6666666666665px) {font-size: 4em;};font-size: 6vw;'
    );
    expect(output2).toEqual(
      '@media (max-width: 832px) {font-size: 2.6em;}@media (min-width: 1066.6656px) {font-size: 3.33333em;};font-size: 5vw;'
    );
  });

  it('should output expected with min, max and fallback value', () => {
    const output1 = responsiveType('6vw', '3em', '4em', '3.5em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    const output2 = responsiveType('5vw', '2.6em', '3.33333em', '2.966665em')
      .join('')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s\s/g, '');
    expect(output1).toEqual(
      '@media (max-width: 800px) {font-size: 3em;}@media (min-width: 1066.6666666666665px) {font-size: 4em;};font-size: 3.5em;font-size: 6vw;'
    );
    expect(output2).toEqual(
      '@media (max-width: 832px) {font-size: 2.6em;}@media (min-width: 1066.6656px) {font-size: 3.33333em;};font-size: 2.966665em;font-size: 5vw;'
    );
  });
});
