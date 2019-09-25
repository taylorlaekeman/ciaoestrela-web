import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import Button from './Button';
import { actions as cartActions, getCartItem } from '../store/cart';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import OrderPageImage from '../assets/images/order.png';
import panelStyle from '../styles/panelStyle';
import UnstyledSelect from './Select';

const Main = styled.main`
  display: grid;
  grid-row-gap: 20px;
  grid-template-areas:
    'form'
    'image';

  @media (min-width: 540px) {
    grid-template-areas:
      '. form '
      '. image';
    grid-template-columns: 1fr 500px;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      'image form'
      'image .   ';
    grid-template-columns: 1fr 500px;
    grid-column-gap: 20px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. image . form .'
      '. image . .    .';
    grid-template-columns: 1fr 600px 20px 500px 1fr;
    grid-column-gap: 0;
  }
`;

const Form = styled.form`
  ${panelStyle}
  grid-area: form;

  display: grid;
  grid-template-areas:
    'cardstock   cardstock  '
    'select      select     '
    'ideas-label ideas-label'
    'ideas       ideas      '
    'submit      .          ';
  grid-template-columns: auto 1fr;
  grid-row-gap: 10px;
`;

const CardstockLabel = styled.label`
  grid-area: cardstock;
`;

const Select = styled(UnstyledSelect)`
  grid-area: select;
`;

const IdeasLabel = styled.label`
  grid-area: ideas-label;
`;

const IdeasTextarea = styled.textarea`
  grid-area: ideas;
  height: 100px;
  border: solid ${colours.grey[300]} 1px;
  font-family: ${fonts.body}, ${fonts.fallback};
  color: ${colours.grey[400]};
  font-weight: 300;
  border-radius: 0;
  -webkit-appearance: none;
`;

const Image = styled.img`
  width: 100%;
  grid-area: image;
`;

const isEdit = () => {
  const path = window.location.pathname;
  const splitPath = path.split('/');
  return splitPath[splitPath.length - 1] !== 'order';
};

const parseIndexFromUrl = () => {
  const path = window.location.pathname;
  const splitPath = path.split('/');
  return splitPath[splitPath.length - 1] - 1;
};

const OrderPage = () => {
  const index = parseIndexFromUrl();
  const cartItem = useSelector(state => getCartItem(state, index));
  const [cardstock, setCardstock] = useState(isEdit() ? cartItem.cardstock : '4" x 5.5" white');
  const [ideas, setIdeas] = useState(isEdit() ? cartItem.ideas : '');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  const submitForm = () => {
    setHasSubmitted(true);
    if (isEdit()) {
      dispatch(cartActions.updateCartItem({ cardstock, ideas }, index));
    } else {
      dispatch(cartActions.addCustomCardToCart({ cardstock, ideas }));
    }
  };

  if (hasSubmitted) {
    return <Redirect to="/cart" />;
  }

  return (
    <Main>
      <Form action="#">
        <CardstockLabel>Which cardstock would you like me to use to make your card?</CardstockLabel>

        <Select
          onSelect={setCardstock}
          options={['4" x 5.5" white', '4" x 5.5" ivory', '4" x 5.5" brown', '5" x 6.5" white']}
          selected={cardstock}
        />

        <IdeasLabel>Please share any ideas you have for the design of your card!</IdeasLabel>
        <IdeasTextarea value={ideas} onChange={(event) => { setIdeas(event.target.value); }} />

        <Button onClick={submitForm} isFormSubmit>{isEdit() ? 'Update cart' : 'Add to cart'}</Button>
      </Form>
      <Image src={OrderPageImage} alt="Ciao, Estrela lion with leaves" />
    </Main>
  );
};

export default OrderPage;
