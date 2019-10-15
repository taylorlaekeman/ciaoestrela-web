import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';
import getArea from '../utils/getArea';

const replaceColourIfError = (colour, props) => (props.hasVisibleError ? 'red' : colour);

const Container = styled.div`
  ${getArea}
`;

const Label = styled.label`
  padding: 0 12px;
  font-size: 1rem;
  color: ${props => replaceColourIfError(colours.green['600'], props)};
`;

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
}) => {
  const isValid = validity.valid;
  const isDirty = value !== '';
  const hasVisibleError = (areErrorsVisible || isDirty) && !isValid;
  return (
    <Container area={area} className={className}>
      <Label
        hasVisibleError={hasVisibleError}
        htmlFor={label}
      >
        {label}
      </Label>
      <StyledInput
        hasVisibleError={hasVisibleError}
        id={label}
        name={label}
        maxLength={maxLength}
        minLength={minLength}
        onChange={event => onChange({ value: event.target.value, validity: event.target.validity })}
        required={isRequired}
        type={type}
        value={value}
      />
      {hasVisibleError && validity.valueMissing && (
        <Error htmlFor={label}>This field is required</Error>
      )}
      {hasVisibleError && validity.typeMismatch && (
        <Error htmlFor={label}>{`Must be a valid ${type}`}</Error>
      )}
      {hasVisibleError && validity.tooShort && (
        <Error htmlFor={label}>{`This field must be at least ${minLength} characters long`}</Error>
      )}
    </Container>
  );
};

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
  areErrorsVisible: true,
  className: '',
  isRequired: false,
  maxLength: '',
  minLength: '',
  type: 'text',
};

export default Input;
