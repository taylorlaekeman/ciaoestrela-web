import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';

const getSharedStyles = (props) => `
  font-size: 0.9rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  color: ${colours.grey[600]};
  background-color: ${props.isSecondary ? colours.grey['300'] : colours.green['200']};
  border: none;
  border-radius: 5px;
  box-shadow: ${boxShadow.medium};
  padding: 10px 20px;
  display: inline-block;
  -webkit-appearance: none;

  &:hover {
    background-color: ${colours.green['300']};
  }

  &:active {
    box-shadow: ${boxShadow.low};
  }
`;

const plainLinkStyles = `
  color: ${colours.grey[600]};
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

const StyledLink = styled(({ isPlain, isSecondary, ...rest }) => <Link {...rest} />)`
  ${props => (props.isPlain ? plainLinkStyles : getSharedStyles(props))}
`;

const Button = ({
  children,
  className,
  isFormSubmit,
  isPlain,
  isSecondary,
  navigateTo,
  onClick,
}) => {
  if (isFormSubmit) {
    return (
      <StyledSubmit
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
      className={className}
      isSecondary={isSecondary}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFormSubmit: PropTypes.bool,
  isPlain: PropTypes.bool,
  isSecondary: PropTypes.bool,
  navigateTo: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  isFormSubmit: false,
  isPlain: false,
  isSecondary: false,
  navigateTo: '',
  onClick: null,
};

export default Button;
