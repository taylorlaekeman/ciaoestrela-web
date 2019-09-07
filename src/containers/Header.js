import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UnstyledCart } from '../assets/icons/cart.svg';
import Link from '../components/Link';
import colours from '../styles/colours';

const Header = styled.header`
  display: grid;
  padding: 20px 20px;
  background-color: white;
  box-shadow: 0px 2px 6px -4px ${colours.grey['400']};
  grid-template-columns: 1fr;
  grid-template-areas:
    'nav';

  @media (min-width: 1160px) {
    grid-template-areas: '. nav .';
    grid-template-columns: 1fr 1120px 1fr;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-area: nav;
  grid-template-areas:
    'title title   cart '
    'about gallery order';
  grid-template-columns: 1fr 1fr 1fr;

  @media (min-width: 500px) {
    grid-template-areas: 'title . about gallery order cart';
    grid-template-columns: auto 1fr auto auto auto auto;
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
  fill: ${colours.grey['300']};
  width: 15px;
`;

export default () => (
  <Header>
    <Nav>
      <TitleLink to="/" plain>
        <h1>Ciao, Estrela Co.</h1>
      </TitleLink>
      <CartLink plain><Cart /></CartLink>
      <AboutLink to="/about" plain>about</AboutLink>
      <GalleryLink to="/gallery" plain>gallery</GalleryLink>
      <OrderLink to="/order" plain>order now</OrderLink>
    </Nav>
  </Header>
);
