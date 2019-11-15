import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
import FormField, { hasValidation, hasVisibleError, replaceColourIfError } from './FormField';

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: solid ${props => replaceColourIfError(colours.grey['300'], props)} 1px;
  border-radius: 5px;
  color: ${props => replaceColourIfError(colours.green['600'], props)};
  font-family: ${fonts.body}, ${fonts.fallback};
  font-weight: 300;
  -webkit-appearance: none;

  resize: none;
  box-shadow: none;

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
      validity: event.target.validity
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
