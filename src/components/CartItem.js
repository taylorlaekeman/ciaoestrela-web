import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import panelStyle from '../styles/panelStyle';

const Section = styled.section`
  ${panelStyle}
  display: grid;
  grid-gap: 10px;
`;

const Heading = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const Line = styled.p`
  margin: 0;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const CartItem = ({ item }) => (
  <Section>
    <Heading>Custom card</Heading>
    <Line>
      {'on '}
      <Bold>{item.cardstock}</Bold>
      {' paper'}
    </Line>
    {item.ideas && <Line>{item.ideas}</Line>}
  </Section>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    cardstock: PropTypes.string.isRequired,
    ideas: PropTypes.string,
  }).isRequired,
};

export default CartItem;
