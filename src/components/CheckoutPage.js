import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import border from '../styles/border';
import borderRadius from '../styles/borderRadius';
import boxShadow from '../styles/boxShadow';
import Button from './Button';
import CartSummary from './CartSummary';
import CheckoutBottomImage from '../assets/images/checkout-bottom.png';
import CheckoutTopImage from '../assets/images/checkout-top.png';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { getCart } from '../store/cart';
import hslToRgb from '../utils/hslToRgb';
import Image from './Image';
import Input from './Input';
import { emptyRequiredInput } from './FormField';
import panelStyle from '../styles/panelStyle';
import TextArea from './TextArea';

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
  ${panelStyle}
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
  ${panelStyle}
`;

const isValid = field => field.validity.valid;

const StyledCardElement = styled(CardElement)`
  border: ${props => (props.areErrorsVisible ? border.error : border.normal)};
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

const CheckoutPage = () => {
  const cart = useSelector(getCart);
  const [email, setEmail] = useState(emptyRequiredInput);
  const [address, setAddress] = useState(emptyRequiredInput);
  const [areErrorsVisible, setAreErrorsVisible] = useState(false);

  const placeOrder = (event) => {
    event.preventDefault();
    setAreErrorsVisible(true);
    const hasErrors = !(isValid(email) && isValid(address));
    if (!hasErrors) {
      console.log('placed order!');
    }
  };

  return (
    <Main>
      <Forms>
        <StyledSummary area="summary" cart={cart} />
        <ContactForm action="#">
          <SectionTitle>Contact Information</SectionTitle>
          <Input
            area="email"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Email Address"
            type="email"
            onChange={setEmail}
            validity={email.validity}
            value={email.value}
          />
        </ContactForm>
        <ShippingForm action="#">
          <SectionTitle>Shipping Information</SectionTitle>
          <TextArea
            area="address"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Address"
            onChange={setAddress}
            rows={4}
            validity={address.validity}
            value={address.value}
          />
        </ShippingForm>
        <BillingForm action="#">
          <SectionTitle>Billing Information</SectionTitle>
          <StyledCardElement
            areErrorsVisible={areErrorsVisible}
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

export default injectStripe(CheckoutPage);
