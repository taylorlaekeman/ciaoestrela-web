import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: ${props =>
    props.errorMessage ? props.theme.border.error : props.theme.border.normal};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props =>
    props.errorMessage
      ? props.theme.colours.red['400']
      : props.theme.colours.green['600']};
  font-family: ${props =>
    `${props.theme.fonts.body}, ${props.theme.fonts.fallback}`};
  font-size: 1.2rem;
  font-weight: 300;
  -webkit-appearance: none;
  box-shadow: ${props =>
    props.errorMessage
      ? props.theme.boxShadow.innerError
      : props.theme.boxShadow.inner};

  resize: none;

  &:focus {
    outline: none;
  }
`;

const TextArea = ({
  className,
  errorMessage,
  label,
  onChange,
  rows,
  value
}) => (
  <StyledTextArea
    className={className}
    errorMessage={errorMessage}
    id={label}
    name={label}
    onChange={event => onChange(event.target.value)}
    rows={rows}
    value={value}
  />
);

TextArea.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

TextArea.defaultProps = {
  errorMessage: '',
  className: '',
  rows: 3
};

export default TextArea;
