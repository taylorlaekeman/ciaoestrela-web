import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';

const getTextDecoration = ({ button, plain }) => {
  if (button || plain) return 'none';
  return 'underlined';
};

const StyledLink = styled(RouterLink)`
  text-decoration: ${props => getTextDecoration(props)};
  color: ${props => (props.button ? colours.grey['600'] : colours.grey['400'])};
  background-color: ${props => (props.button ? colours.green['300'] : 'white')};
  padding: ${props => (props.button ? '10px 20px' : '0')};
  font-weight: ${props => (props.button ? '400' : '200')};
  border-radius: ${props => (props.button ? '5px' : '0')};
  box-shadow: ${props => (props.button ? boxShadow : '0')};
  display: inline-block;
`;

const Link = ({
  button,
  children,
  className,
  plain,
  to,
}) => (
  <StyledLink
    button={button}
    className={className}
    to={to}
    plain={plain}
  >
    {children}
  </StyledLink>
);

Link.propTypes = {
  button: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  plain: PropTypes.bool,
  to: PropTypes.string,
};

Link.defaultProps = {
  button: false,
  plain: false,
  to: false,
};

export default Link;
