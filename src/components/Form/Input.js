import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import border from '../../styles/border';
import borderRadius from '../../styles/borderRadius';
import boxShadow from '../../styles/boxShadow';
import colours from '../../styles/colours';
import fonts from '../../styles/fonts';

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: ${props => (props.errorMessage ? border.error : border.normal)};
  border-radius: ${borderRadius};
  font-family: ${fonts.body}, ${fonts.fallback};
  font-size: 1.2rem;
  font-weight: 300;
  color: ${props => (props.errorMessage ? colours.red['400'] : colours.green['600'])};
  box-shadow: ${props => (props.errorMessage ? boxShadow.innerError : boxShadow.inner)};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
`;

const Input = ({
  className,
  errorMessage,
  label,
  onChange,
  type,
  value,
}) => (
  <StyledInput
    className={className}
    errorMessage={errorMessage}
    id={label}
    name={label}
    onChange={event => onChange(event.target.value)}
    type={type}
    value={value}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Input.defaultProps = {
  className: '',
  errorMessage: '',
  type: 'text',
  value: '',
};

export default Input;
