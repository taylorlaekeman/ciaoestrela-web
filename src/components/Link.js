import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colours from '../styles/Colours';

const StyledLink = styled.a`
  text-decoration: ${props => (props.plain ? 'none' : 'underlined')};
  color: ${Colours['grey-400']};
`;

const Link = ({
  children, className, plain, to,
}) => (
  <StyledLink className={className} href={to} plain={plain}>{children}</StyledLink>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  plain: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

export default Link;
