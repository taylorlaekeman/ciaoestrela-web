import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';

const sharedStyles = `
  text-decoration: none;
  color: ${colours.grey[600]};
  background-color: ${colours.green['200']};
  border: none;
  border-radius: 5px;
  box-shadow: ${boxShadow.medium};
  padding: 10px 20px;
  display: inline-block;

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
  ${sharedStyles}
`;

const StyledSubmit = styled.input`
  ${sharedStyles}
`;

const StyledLink = styled(({ isPlain, ...rest }) => <Link {...rest} />)`
  ${props => (props.isPlain ? plainLinkStyles : sharedStyles)}
`;

const Button = ({
  children,
  className,
  isFormSubmit,
  isPlain,
  navigateTo,
  onClick,
}) => {
  if (isFormSubmit) {
    return (
      <StyledSubmit
        className={className}
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
        to={navigateTo}
        isPlain={isPlain}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton
      className={className}
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
  navigateTo: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  isFormSubmit: false,
  isPlain: false,
  navigateTo: '',
  onClick: null,
};

export default Button;
