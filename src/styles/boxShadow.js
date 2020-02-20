import colours from './colours';

const boxShadow = {
  medium: `0 8px 6px -10px ${colours.green['600']}`,
  innerMedium: `inset 0 4px 4px -5px ${colours.green['600']}`,
  low: `0 6px 6px -10px ${colours.green['600']}`,
  normal: `0 8px 6px -10px ${colours.green['600']}`,
  error: `0 8px 6px -10px ${colours.red['600']}`,
  inner: `inset 0 4px 4px -5px ${colours.green['600']}`,
  innerError: `inset 0 4px 4px -5px ${colours.red['600']}`
};

export default boxShadow;
