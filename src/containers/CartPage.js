import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button';
import CartItem from '../components/CartItem';
import { getCart } from '../store/cart';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'summary'
    'items'
    'buttons';
  grid-gap: 20px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Summary = styled.section`
  grid-area: summary;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TotalCost = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
`;

const CostBreakdown = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const CartItems = styled.section`
  display: grid;
  grid-area: items;
  grid-gap: 20px;
`;

const Buttons = styled.section`
  grid-area: buttons;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto auto 1fr;
`;

const CartPage = () => {
  let cart = useSelector(getCart);
  cart = [{
    cardstock: 'test cardstock',
    ideas: 'test ideas',
  }, {
    cardstock: 'test cardstock',
    ideas: 'test other ideas',
  }];

  if (cart.length === 0) {
    return (
      <div>
        Your cart is empty!
        <Button>Add another card</Button>
      </div>
    );
  }

  return (
    <Main>
      <Summary>
        <TotalCost>{`$${cart.length * 10}`}</TotalCost>
        <CostBreakdown>
          <Bold>{cart.length}</Bold>
          {` card${cart.length > 1 ? 's' : ''} at $10 each`}
        </CostBreakdown>
      </Summary>
      <CartItems>
        {cart.map((item, index) => <CartItem key={`${item.cardstock}-${item.idea ? item.idea : index}`} item={item} />)}
      </CartItems>
      <Buttons>
        <Button navigateTo="/checkout">Proceed to checkout</Button>
        <Button navigateTo="/order" isSecondary>Add another card</Button>
      </Buttons>
    </Main>
  );
};

export default CartPage;
