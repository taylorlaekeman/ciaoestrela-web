import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';
import FormField, { hasVisibleError, replaceColourIfError } from './FormField';

const StyledInput = styled.input`
  box-sizing: border-box;
  border-radius: 0;
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: solid ${props => replaceColourIfError(colours.grey['300'], props)} 1px;
  font-size: 1.2rem;
  font-weight: 300;
  color: ${props => replaceColourIfError(colours.green['600'], props)};
  box-shadow: ${boxShadow.medium};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
`;

const Input = ({
  area,
  areErrorsVisible,
  className,
  isRequired,
  label,
  maxLength,
  minLength,
  onChange,
  type,
  validity,
  value,
}) => (
  <FormField
    area={area}
    className={className}
    hasVisibleError={hasVisibleError(value, validity, areErrorsVisible)}
    label={label}
    minLength={minLength}
    type={type}
    validity={validity}
  >
    <StyledInput
      hasVisibleError={hasVisibleError(value, validity, areErrorsVisible)}
      id={label}
      name={label}
      maxLength={maxLength}
      minLength={minLength}
      onChange={event => onChange({ value: event.target.value, validity: event.target.validity })}
      required={isRequired}
      type={type}
      value={value}
    />
  </FormField>
);

Input.propTypes = {
  area: PropTypes.string,
  areErrorsVisible: PropTypes.bool,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  minLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

Input.defaultProps = {
  area: '',
  areErrorsVisible: true,
  className: '',
  isRequired: false,
  maxLength: '',
  minLength: '',
  type: 'text',
};

export default Input;
