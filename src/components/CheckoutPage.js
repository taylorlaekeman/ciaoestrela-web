import React, { useEffect, useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import border from 'styles/border';
import {
  actions as orderActions,
  selectors as orderSelectors,
} from 'store/orders';
import borderRadius from '../styles/borderRadius';
import boxShadow from '../styles/boxShadow';
import Button from './Button';
import CartSummary from './CartSummary';
import CheckoutBottomImage from '../assets/images/checkout-bottom.png';
import CheckoutTopImage from '../assets/images/checkout-top.png';
import colours from '../styles/colours';
import Field from './Form/Field';
import fonts from '../styles/fonts';
import { getCart } from '../store/cart';
import hslToRgb from '../utils/hslToRgb';
import Image from './Image';
import Input from './Form/Input';
import TextArea from './Form/TextArea';

const Main = styled.main`
  display: grid;
  grid-row-gap: 20px;
  grid-template-areas:
    'forms '
    'images';
  grid-template-columns: 1fr;

  @media (min-width: 540px) {
    grid-template-areas:
      '. forms '
      '. images';
    grid-template-columns: 1fr 500px;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      'images forms'
      'images .    ';
    grid-column-gap: 20px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. images . forms .'
      '. images . .     .';
    grid-template-columns: 1fr 600px 20px 500px 1fr;
    grid-column-gap: 0;
  }
`;

const Forms = styled.section`
  grid-area: forms;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'summary  summary '
    'contact  contact '
    'shipping shipping'
    'billing  billing '
    'button   .       ';
`;

const Images = styled.section`
  grid-area: images;
  display: grid;
  grid-gap: 20px;
`;

const Form = styled.form`
  ${props => props.theme.panel}
  display: grid;
  grid-gap: 20px;
`;

const ContactForm = styled(Form)`
  grid-area: contact;
  grid-template-areas:
    'title'
    'email';
`;

const ShippingForm = styled(Form)`
  grid-area: shipping;
  grid-template-areas:
    'title  '
    'address';
`;

const BillingForm = styled(Form)`
  grid-area: billing;
  grid-template-areas:
    'title '
    'stripe';
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  grid-area: title;
`;

const StyledSummary = styled(CartSummary)`
  ${props => props.theme.panel}
`;

const StyledCardElement = styled(CardElement)`
  border: ${props => (props.errorMessage ? border.error : border.normal)};
  border-radius: ${borderRadius};
  padding: 12px;
  box-shadow: ${boxShadow.innerMedium};
`;

const creditCardInputStyle = {
  base: {
    color: hslToRgb(colours.green['600']),
    fontFamily: `${fonts.body}, ${fonts.fallback}`,
    fontSize: '22px',
    fontWeight: 300,
  },
  invalid: {
    color: hslToRgb(colours.red['300']),
  },
};

const getEmailErrorMessage = (email, hasSubmitted) => {
  if (!hasSubmitted) return '';
  if (!email) return 'Please enter your email address';
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return 'The email you\'ve entered is invalid';
  return '';
};

const getAddressErrorMessage = (address, hasSubmitted) => {
  if (!hasSubmitted) return '';
  if (!address) return 'Please enter your shipping address';
  return '';
};

const CheckoutPage = ({ elements, stripe }) => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const clientSecret = useSelector(orderSelectors.getClientSecret);
  const hasPaid = useSelector(orderSelectors.hasPaid);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const emailError = getEmailErrorMessage(email, hasSubmitted);
  const addressError = getAddressErrorMessage(address, hasSubmitted);

  const placeOrder = (event) => {
    event.preventDefault();
    dispatch(orderActions.createOrder(email, address));
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (clientSecret) {
      const makePayment = async () => {
        const paymentInfo = {
          payment_method: {
            card: elements.getElement('card'),
          },
        };
        const result = await stripe.confirmCardPayment(clientSecret, paymentInfo);
        const isConfirmed = !('error' in result);
        if (isConfirmed) dispatch(orderActions.confirmPayment);
      };
      makePayment();
    }
  }, [clientSecret, dispatch, elements, stripe]);

  if (hasPaid) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Main>
      <Forms>
        <StyledSummary area="summary" cart={cart} />
        <ContactForm action="#">
          <SectionTitle>Contact Information</SectionTitle>
          <Field
            area="email"
            errorMessage={emailError}
            label="Email Address"
          >
            <Input
              errorMessage={emailError}
              label="Email Address"
              type="email"
              onChange={setEmail}
              value={email}
            />
          </Field>
        </ContactForm>
        <ShippingForm action="#">
          <SectionTitle>Shipping Information</SectionTitle>
          <Field
            area="address"
            errorMessage={addressError}
            label="Address"
          >
            <TextArea
              errorMessage={addressError}
              label="Address"
              onChange={setAddress}
              rows={4}
              value={address}
            />
          </Field>
        </ShippingForm>
        <BillingForm action="#">
          <SectionTitle>Billing Information</SectionTitle>
          <StyledCardElement
            hidePostalCode
            style={creditCardInputStyle}
          />
        </BillingForm>
        <Button area="button" onClick={placeOrder}>Place order</Button>
      </Forms>
      <Images>
        <Image
          alt="Two polaroid photos over a grid background.  On the upper right, an image of a mother's day card featuring a woman sitting and looking at the sky.  On the lower left, an image of a card featuring two men posing infront of mountains."
          src={CheckoutTopImage}
        />
        <Image
          alt="An image of a cartoon lion on a piece of paper taped to a background decorated with stars."
          src={CheckoutBottomImage}
        />
      </Images>
    </Main>
  );
};

CheckoutPage.propTypes = {
  elements: PropTypes.shape({
    getElement: PropTypes.func.isRequired,
  }).isRequired,
  stripe: PropTypes.shape({
    confirmCardPayment: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectStripe(CheckoutPage);
