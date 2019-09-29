import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';
import getArea from '../utils/getArea';

const Container = styled.div`
  ${getArea}
`;

const Label = styled.label`
  padding: 0 12px;
  font-size: 1rem;
  color: ${props => (props.isValid ? colours.green['600'] : 'red')};
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border-radius: 0;
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: solid ${colours.grey['300']} 1px;
  font-size: 1.2rem;
  font-weight: 300;
  color: ${colours.green['600']};
  box-shadow: ${boxShadow.medium};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &:invalid {
    color: red;
    border-bottom-color: red;
  }
`;

const Error = styled.label`
  padding: 12px;
  color: red;
`;

export const emptyInput = {
  value: '',
  validity: {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false,
  },
};

export const emptyRequiredInput = {
  value: '',
  validity: {
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: false,
    valueMissing: true,
  },
};

const isValid = validity => validity.valid;

const Input = ({
  area,
  className,
  isRequired,
  label,
  onChange,
  type,
  validity,
  value,
}) => (
  <Container area={area} className={className}>
    <Label htmlFor={label} isValid={isValid(validity)}>{label}</Label>
    <StyledInput
      id={label}
      name={label}
      onChange={event => onChange({ value: event.target.value, validity: event.target.validity })}
      required={isRequired}
      type={type}
      value={value}
    />
    {validity.valueMissing && <Error htmlFor={label}>This field is required</Error>}
    {validity.typeMismatch && <Error htmlFor={label}>{`Must be a valid ${type}`}</Error>}
  </Container>
);

Input.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  validity: PropTypes.shape({
    badInput: PropTypes.bool.isRequired,
    customError: PropTypes.bool.isRequired,
    patternMismatch: PropTypes.bool.isRequired,
    rangeOverflow: PropTypes.bool.isRequired,
    stepMismatch: PropTypes.bool.isRequired,
    tooLong: PropTypes.bool.isRequired,
    tooShort: PropTypes.bool.isRequired,
    typeMismatch: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    valueMissing: PropTypes.bool.isRequired,
  }).isRequired,
};

Input.defaultProps = {
  area: '',
  className: '',
  isRequired: false,
  type: 'text',
};

export default Input;
