import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../../styles/colours';
import getArea from '../../utils/getArea';

const Container = styled.div`
  ${getArea}
`;

const Label = styled.label`
  color: ${props => (props.errorMessage ? colours.red['400'] : colours.green['600'])};
`;

const Error = styled.label`
  color: ${colours.red['400']};
`;

const Field = ({
  area,
  children,
  className,
  errorMessage,
  label,
}) => (
  <Container area={area} className={className}>
    {label && (
      <Label
        errorMessage={errorMessage}
        htmlFor={label}
      >
        {label}
      </Label>
    )}
    {children}
    {errorMessage && <Error>{errorMessage}</Error>}
  </Container>
);

Field.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Field.defaultProps = {
  area: '',
  className: '',
  errorMessage: '',
};

export default Field;
