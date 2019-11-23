import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import border from '../styles/border';
import borderRadius from '../styles/borderRadius';
import colours from '../styles/colours';
import boxShadow from '../styles/boxShadow';
import fonts from '../styles/fonts';
import FormField, { hasValidation, hasVisibleError } from './FormField';

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: ${props => (props.hasVisibleError ? border.error : border.normal)};
  border-radius: ${borderRadius};
  color: ${props => (props.hasVisibleError ? colours.red['400'] : colours.green['600'])};
  font-family: ${fonts.body}, ${fonts.fallback};
  font-size: 1.2rem;
  font-weight: 300;
  -webkit-appearance: none;
  box-shadow: ${boxShadow.innerMedium};

  resize: none;

  &:focus {
    outline: none;
  }
`;

const TextArea = ({
  area,
  className,
  areErrorsVisible,
  isRequired,
  label,
  onChange,
  rows,
  validity,
  value,
}) => {
  const reportChange = (event) => {
    const simpleValue = event.target.value;
    const complexValue = {
      value: simpleValue,
      validity: event.target.validity,
    };
    const valueToReport = hasValidation(validity) ? complexValue : simpleValue;
    onChange(valueToReport);
  };

  return (
    <FormField
      area={area}
      className={className}
      hasVisibleError={hasVisibleError(value, validity, areErrorsVisible)}
      label={label}
      validity={validity}
    >
      <StyledTextArea
        hasVisibleError={hasVisibleError(value, validity, areErrorsVisible)}
        id={label}
        name={label}
        onChange={reportChange}
        required={isRequired}
        rows={rows}
        value={value}
      />
    </FormField>
  );
};

TextArea.propTypes = {
  area: PropTypes.string,
  areErrorsVisible: PropTypes.bool,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

TextArea.defaultProps = {
  area: '',
  areErrorsVisible: true,
  className: '',
  isRequired: false,
  rows: 3,
  validity: {},
};

export default TextArea;
