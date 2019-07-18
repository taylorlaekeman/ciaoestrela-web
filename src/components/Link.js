import React from 'react';
import styled from 'styled-components';
import Colours from '../styles/Colours';

const Link = styled.a`
  text-decoration: ${props => props.plain ? "none" : "underlined"};
  color: ${Colours['grey-400']};
`;

export default ({ children, className, plain, to }) => {
  return (
    <Link className={className} href={to} plain={plain}>{children}</Link>
  );
};
