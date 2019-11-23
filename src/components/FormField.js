import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../styles/colours';
import getArea from '../utils/getArea';

export const hasValidation = (validity) => {
  const isValidityEmpty = Object.getOwnPropertyNames(validity).length === 0;
  return !isValidityEmpty || (validity instanceof ValidityState);
};

export const hasVisibleError = (value, validity, areErrorsVisible) => {
  if (!hasValidation(validity)) return false;
  const isValid = validity.valid;
  const isDirty = value !== '';
  return (areErrorsVisible || isDirty) && !isValid;
};

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

const Container = styled.div`
  ${getArea}
`;

const Label = styled.label`
  color: ${props => (props.hasVisibleError ? colours.red['400'] : colours.green['600'])};
`;

const Error = styled.label`
  color: ${colours.red['400']};
`;

const FormField = ({
  area,
  children,
  className,
  hasVisibleError: hasError,
  label,
  minLength,
  type,
  validity,
}) => (
  <Container area={area} className={className}>
    {label && (
      <Label
        hasVisibleError={hasError}
        htmlFor={label}
      >
        {label}
      </Label>
    )}
    {children}
    {hasError && validity.valueMissing && (
    <Error htmlFor={label}>This field is required</Error>
    )}
    {hasError && validity.typeMismatch && (
    <Error htmlFor={label}>{`Must be a valid ${type}`}</Error>
    )}
    {hasError && validity.tooShort && (
    <Error htmlFor={label}>{`This field must be at least ${minLength} characters long`}</Error>
    )}
  </Container>
);

FormField.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasVisibleError: PropTypes.bool,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  validity: PropTypes.shape({
    badInput: PropTypes.bool,
    customError: PropTypes.bool,
    patternMismatch: PropTypes.bool,
    rangeOverflow: PropTypes.bool,
    stepMismatch: PropTypes.bool,
    tooLong: PropTypes.bool,
    tooShort: PropTypes.bool,
    typeMismatch: PropTypes.bool,
    valid: PropTypes.bool,
    valueMissing: PropTypes.bool,
  }),
};

FormField.defaultProps = {
  area: '',
  className: '',
  hasVisibleError: true,
  minLength: '',
  type: 'text',
  validity: {},
};

export default FormField;
