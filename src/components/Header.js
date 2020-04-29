import React from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCart } from 'assets/icons/cart.svg';
import Logo from 'assets/images/logo.png';
import colours from 'styles/colours';
import Button from './Button';

const Header = styled.header`
  display: grid;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 2px 6px -4px ${colours.grey['400']};
  grid-template-columns: 1fr;
  grid-template-areas: 'nav';

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
  grid-template-columns: max-content 1fr max-content;
  grid-row-gap: 10px;

  @media (min-width: 575px) {
    grid-template-areas: 'title . about gallery order cart';
    grid-template-columns: auto 1fr auto auto auto auto;
    align-items: center;
    grid-column-gap: 20px;
  }
`;

const Image = styled.img`
  height: 60px;
  margin-right: 10px;
  width: 60px;
`;

const TitleLink = styled(Button)`
  align-items: center;
  display: flex;
  grid-area: title;
`;

const CartLink = styled(Button)`
  grid-area: cart;
  justify-self: end;
  align-self: center;
`;

const AboutLink = styled(Button)`
  grid-area: about;
`;

const GalleryLink = styled(Button)`
  grid-area: gallery;
  justify-self: center;
`;

const OrderLink = styled(Button)`
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
      <TitleLink navigateTo="/" isPlain>
        <Image src={Logo} />
        <h1>Ciao, Estrela Co.</h1>
      </TitleLink>
      <CartLink navigateTo="/cart" isPlain>
        <Cart />
      </CartLink>
      <AboutLink navigateTo="/about" isPlain>
        about
      </AboutLink>
      <GalleryLink navigateTo="/gallery" isPlain>
        gallery
      </GalleryLink>
      <OrderLink navigateTo="/order" isPlain>
        order now
      </OrderLink>
    </Nav>
  </Header>
);
