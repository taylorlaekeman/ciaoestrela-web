import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Colours from '../styles/Colours';

const getTextDecoration = ({ button, plain }) => {
  if (button || plain) return 'none';
  return 'underlined';
};

const StyledLink = styled(RouterLink)`
  text-decoration: ${props => getTextDecoration(props)};
  color: ${props => (props.button ? Colours['grey-600'] : Colours['grey-400'])};
  background-color: ${props => (props.button ? Colours['green-300'] : 'white')};
  padding: ${props => (props.button ? '10px 20px' : '0')};
  font-weight: ${props => (props.button ? '400' : '200')};
  border-radius: ${props => (props.button ? '5px' : '0')};
  box-shadow: ${props => (props.button ? `0 8px 6px -10px ${Colours['green-600']}` : '0')};
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
  button: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  plain: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
