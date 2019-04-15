export const stripUnit = value => {
  const match = /[0-9]+\.?[0-9]*/.exec(value);
  return match ? Number(match[0]) : '';
};

export const getUnit = value => {
  const match = /em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax/i.exec(value);
  return match ? match[0] : '';
};

export const multiply = (value, multiple) => {
  const number = stripUnit(value) || 0;
  const unit = getUnit(value) || '';
  return `${number * multiple}${unit}`;
};

export const divide = (value, denominator) => {
  const number = stripUnit(value) || 0;
  const unit = getUnit(value) || '';
  return `${number / denominator}${unit}`;
};
