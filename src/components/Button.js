import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import boxShadow from '../styles/boxShadow';
import getArea from '../utils/getArea';

const getSharedStyles = props => `
  ${getArea(props)}
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: ${props.theme.colours.grey[600]};
  background-color: ${
    props.isSecondary
      ? props.theme.colours.grey['300']
      : props.theme.colours.green['200']
  };
  border: none;
  border-radius: 5px;
  box-shadow: ${boxShadow.medium};
  padding: 10px 20px;
  display: inline-block;
  -webkit-appearance: none;

  &:hover {
    background-color: ${
      props.isSecondary
        ? props.theme.colours.grey['400']
        : props.theme.colours.green['300']
    };
  }

  &:active {
    box-shadow: ${props.theme.boxShadow.low};
  }
`;

const getPlainStyles = props => `
  ${getArea(props)}
  color: ${props.theme.colours.grey[600]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledButton = styled.button`
  ${getSharedStyles}
`;

const StyledSubmit = styled.input`
  ${getSharedStyles}
`;

const StyledLink = styled(({ isPlain, isSecondary, ...rest }) => (
  <Link {...rest} />
))`
  ${props => (props.isPlain ? getPlainStyles(props) : getSharedStyles(props))}
`;

const Button = ({
  area,
  children,
  className,
  isFormSubmit,
  isPlain,
  isSecondary,
  navigateTo,
  onClick
}) => {
  if (isFormSubmit) {
    return (
      <StyledSubmit
        area={area}
        className={className}
        isSecondary={isSecondary}
        type="submit"
        value={children}
        onClick={onClick}
      />
    );
  }
  if (navigateTo) {
    return (
      <StyledLink
        area={area}
        className={className}
        isPlain={isPlain}
        isSecondary={isSecondary}
        to={navigateTo}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton
      area={area}
      className={className}
      isSecondary={isSecondary}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFormSubmit: PropTypes.bool,
  isPlain: PropTypes.bool,
  isSecondary: PropTypes.bool,
  navigateTo: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  area: '',
  className: '',
  isFormSubmit: false,
  isPlain: false,
  isSecondary: false,
  navigateTo: '',
  onClick: null
};

export default Button;
