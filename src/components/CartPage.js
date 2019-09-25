import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from './Button';
import { actions as cartActions, getCart } from '../store/cart';
import CartItem from './CartItem';
import CartPageImage from '../assets/images/cart.png';
import panelStyle from '../styles/panelStyle';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'content'
    'image  ';

  @media (min-width: 540px) {
    grid-template-areas:
      '. content'
      '. image  ';
    grid-template-columns 1fr 500px;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      'image content'
      'image .      ';
    grid-column-gap: 20px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. image . content .'
      '. image . .       .';
    grid-template-columns: 1fr 600px 20px 500px 1fr;
    grid-column-gap: 0;
  }
`;

const EmptyContents = styled.section`
  grid-area: content;
  display: grid;
  grid-template-areas:
    'text   text'
    'button .   ';
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  ${panelStyle}
`;

const EmptyMessage = styled.h2`
  grid-area: text;
  margin: 0;
  font-size: 1.6rem;
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

const Image = styled.img`
  grid-area: image;
  width: 100%;
`;

const isItemSelected = (item, selected) => item.cardstock === selected.cardstock
  && item.ideas === selected.ideas;

const CartPage = () => {
  const cart = useSelector(getCart);
  const [selectedCartItem, selectCartItem] = useState('');
  const dispatch = useDispatch();

  const ImageComponent = <Image src={CartPageImage} alt="Sun cartoon character pushing shopping cart full of potted plants" />;

  if (cart.length === 0) {
    return (
      <Main>
        <EmptyContents>
          <EmptyMessage>Your cart is empty!</EmptyMessage>
          <EmptyButton navigateTo="/order">Add a card</EmptyButton>
        </EmptyContents>
        {ImageComponent}
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
      {ImageComponent}
    </Main>
  );
};

export default CartPage;
