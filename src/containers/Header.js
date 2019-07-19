import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UnstyledCart } from '../assets/icons/cart.svg';
import Link from '../components/Link';
import Colours from '../styles/Colours';

const Header = styled.header`
  display: grid;
  padding: 20px 20px;
  background-color: white;
  box-shadow: 0px 2px 6px -4px ${Colours['grey-400']};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'title title   cart'
    'about gallery order';
  @media (min-width: 500px) {
    grid-template-columns: 1fr auto auto auto auto;
    grid-template-areas: 'title about gallery order cart';
    align-items: center;
    grid-column-gap: 20px;
  }
`;

const TitleLink = styled(Link)`
  grid-area: title;
`;

const CartLink = styled(Link)`
  grid-area: cart;
  justify-self: end;
  align-self: center;
`;

const AboutLink = styled(Link)`
  grid-area: about;
`;

const GalleryLink = styled(Link)`
  grid-area: gallery;
  justify-self: center;
`;

const OrderLink = styled(Link)`
  grid-area: order;
  justify-self: end;
`;

const Cart = styled(UnstyledCart)`
  fill: ${Colours['grey-300']};
  width: 15px;
`;

export default () => (
  <Header>
    <TitleLink plain>
      <h1>Ciao, Estrela Co.</h1>
    </TitleLink>
    <CartLink plain><Cart /></CartLink>
    <AboutLink plain>about</AboutLink>
    <GalleryLink plain>gallery</GalleryLink>
    <OrderLink plain>order now</OrderLink>
  </Header>
);
