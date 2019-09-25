import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../components/Button';
import { actions as cartActions, getCart } from '../store/cart';
import CartItem from '../components/CartItem';
import panelStyle from '../styles/panelStyle';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'content';

  @media (min-width: 540px) {
    grid-template-areas:
      '. content';
    grid-template-columns 1fr 500px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. . content .';
    grid-template-columns: 1fr 620px 500px 1fr;
  }
`;

const EmptyContents = styled.section`
  grid-area: content;
  display: grid;
  grid-template-areas:
    '.      .'
    'button .';
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  ${panelStyle}
`;

const EmptyButton = styled(Button)`
  grid-area: button;
`;

const Contents = styled.section`
  grid-area: content;
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

const isItemSelected = (item, selected) => item.cardstock === selected.cardstock
  && item.ideas === selected.ideas;

const CartPage = () => {
  const cart = useSelector(getCart);
  const [selectedCartItem, selectCartItem] = useState('');
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return (
      <Main>
        <EmptyContents>
          Your cart is empty!
          <EmptyButton navigateTo="/order">Add another card</EmptyButton>
        </EmptyContents>
      </Main>
    );
  }

  const deleteItem = index => () => {
    dispatch(cartActions.removeItemFromCart(index));
  };

  return (
    <Main>
      <Contents>
        <Summary>
          <TotalCost>{`$${cart.length * 10}`}</TotalCost>
          <CostBreakdown>
            <Bold>{cart.length}</Bold>
            {` card${cart.length > 1 ? 's' : ''} at $10 each`}
          </CostBreakdown>
        </Summary>
        <CartItems>
          {cart.map((item, index) => (
            <CartItem
              key={`${item.cardstock}-${item.ideas ? item.ideas : index}`}
              index={index}
              isSelected={isItemSelected(item, selectedCartItem)}
              item={item}
              onSelect={selectCartItem}
              onDelete={deleteItem(index)}
            />
          ))}
        </CartItems>
        <Buttons>
          <Button navigateTo="/checkout">Proceed to checkout</Button>
          <Button navigateTo="/order">Add another card</Button>
        </Buttons>
      </Contents>
    </Main>
  );
};

export default CartPage;
