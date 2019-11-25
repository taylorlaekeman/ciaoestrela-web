import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import border from '../../styles/border';
import borderRadius from '../../styles/borderRadius';
import colours from '../../styles/colours';
import boxShadow from '../../styles/boxShadow';
import fonts from '../../styles/fonts';

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: ${props => (props.errorMessage ? border.error : border.normal)};
  border-radius: ${borderRadius};
  color: ${props => (props.errorMessage ? colours.red['400'] : colours.green['600'])};
  font-family: ${fonts.body}, ${fonts.fallback};
  font-size: 1.2rem;
  font-weight: 300;
  -webkit-appearance: none;
  box-shadow: ${props => (props.errorMessage ? boxShadow.innerError : boxShadow.inner)};

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
  value,
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

TextArea.defaultProps = {
  errorMessage: PropTypes.string,
  className: '',
  rows: 3,
};

export default TextArea;
