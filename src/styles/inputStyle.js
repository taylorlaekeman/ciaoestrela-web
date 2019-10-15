import boxShadow from './boxShadow';
import colours from './colours';

const inputStyle = `
  box-sizing: border-box;
  border-radius: 0;
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: solid ${colours.green['600']} 1px;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${colours.green['600']};
  box-shadow: ${boxShadow.medium};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
`;

export default inputStyle;
