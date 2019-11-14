import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../styles/colours';
import fonts from '../styles/fonts';
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

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  border-radius: 0;
  width: 100%;
  padding: 12px;
  border: solid ${props => replaceColourIfError(colours.grey['300'], props)} 1px;
  border-radius: 5px;
  font-family: ${fonts.body}, ${fonts.fallback};
  font-size: 1.1rem;
  color: ${props => replaceColourIfError(colours.green['600'], props)};
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
      <StyledTextArea
        hasVisibleError={hasVisibleError}
        id={label}
        name={label}
        onChange={event => onChange({ value: event.target.value, validity: event.target.validity })}
        required={isRequired}
        rows={rows}
        value={value}
      />
    </Container>
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

TextArea.defaultProps = {
  area: '',
  areErrorsVisible: true,
  className: '',
  isRequired: false,
  rows: 3,
};

export default TextArea;
