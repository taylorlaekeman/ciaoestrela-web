import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from './Button';
import CartSummary from './CartSummary';
import CheckoutBottomImage from '../assets/images/checkout-bottom.png';
import CheckoutTopImage from '../assets/images/checkout-top.png';
import { getCart } from '../store/cart';
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
  grid-template-areas:
    'title  title '
    'email  email '
    'button .     ';
`;

const ShippingForm = styled(Form)`
  grid-template-areas:
    'title     title    '
    'address   address  '
    'button    .        ';
`;

const BillingForm = styled(Form)`
  grid-template-areas:
    'title    title   '
    'credit   credit  '
    'expiry   expiry  '
    'security security'
    'button   .       ';
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

const CheckoutPage = () => {
  const cart = useSelector(getCart);
  const [email, setEmail] = useState(emptyRequiredInput);
  const [address, setAddress] = useState(emptyRequiredInput);
  const [areErrorsVisible, setAreErrorsVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState(emptyRequiredInput);
  const [expiry, setExpiry] = useState(emptyRequiredInput);
  const [security, setSecurity] = useState(emptyRequiredInput);

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
        <StyledSummary cart={cart} />
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
          <Input
            area="credit"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Credit card number"
            pattern="\d{16}"
            type="number"
            onChange={setCreditCardNumber}
            validity={creditCardNumber.validity}
            value={creditCardNumber.value}
          />
          <Input
            area="expiry"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Expiry"
            type="number"
            onChange={setExpiry}
            validity={expiry.validity}
            value={expiry.value}
          />
          <Input
            area="security"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Security Code"
            type="number"
            onChange={setSecurity}
            validity={security.validity}
            value={security.value}
          />
          <Button
            area="button"
            isFormSubmit
            onClick={placeOrder}
          >
            Place order
          </Button>
        </BillingForm>
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

export default CheckoutPage;
