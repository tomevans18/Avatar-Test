import { stripUnit, getUnit, multiply, divide } from './calculate';

const units = [
  'em',
  'ex',
  '%',
  'px',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',
  'ch',
  'rem',
  'vh',
  'vw',
  'vmin',
  'vmax',
];

describe('Calculate - strip units', () => {
  [1, 2.2, 124.23324343].map(value =>
    units.map(valueType =>
      it(`should remove units from ${valueType} value`, () => {
        expect(stripUnit(`${value}${valueType}`)).toEqual(value);
      })
    )
  );

  it('should return empty string', () => {
    expect(stripUnit('abc')).toEqual('');
  });
});

describe('Calculate - get units', () => {
  [1, 2.2, 124.23324343].map(value =>
    units.map(valueType =>
      it(`should remove get units from ${valueType} value`, () => {
        expect(getUnit(`${value}${valueType}`)).toEqual(valueType);
      })
    )
  );

  it('should return empty string', () => {
    expect(getUnit(123)).toEqual('');
  });
});

describe('Calculate - multiply', () => {
  [1, 2.2, 124.23324343].map(value =>
    units.map(valueType =>
      [0, 1, 2.223424, 15, 2300].map(multiplyBy =>
        it(`should return correct multplied value with units`, () => {
          expect(multiply(`${value}${valueType}`, multiplyBy)).toEqual(
            `${value * multiplyBy}${valueType}`
          );
        })
      )
    )
  );

  it('should handle wrong value passed and return 0 as a string', () => {
    expect(multiply('abc', 2)).toEqual('0');
  });
});
describe('Calculate - divide', () => {
  [1, 2.2, 124.23324343].map(value =>
    units.map(valueType =>
      [0, 1, 2.223424, 15, 2300].map(multiplyBy =>
        it(`should return correct multplied value with units`, () => {
          expect(divide(`${value}${valueType}`, multiplyBy)).toEqual(
            `${value / multiplyBy}${valueType}`
          );
        })
      )
    )
  );

  it('should handle wrong value passed and return 0 as a string', () => {
    expect(divide('abc', 2)).toEqual('0');
  });
});
