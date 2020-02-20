import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: ${props =>
    props.errorMessage ? props.theme.border.error : props.theme.border.normal};
  border-radius: ${props => props.theme.borderRadius};
  font-family: ${props =>
    `${props.theme.fonts.body}, ${props.theme.fonts.fallback}`};
  font-size: 1.2rem;
  font-weight: 300;
  color: ${props =>
    props.errorMessage
      ? props.theme.colours.red['400']
      : props.theme.colours.green['600']};
  box-shadow: ${props =>
    props.errorMessage
      ? props.theme.boxShadow.innerError
      : props.theme.boxShadow.inner};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
`;

const Input = ({ className, errorMessage, label, onChange, type, value }) => (
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
  className: '',
  errorMessage: '',
  type: 'text',
  value: ''
};

export default Input;
