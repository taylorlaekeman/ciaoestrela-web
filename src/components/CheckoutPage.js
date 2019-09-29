import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from './Button';
import CartSummary from './CartSummary';
import { getCart } from '../store/cart';
import Input, { emptyInput, emptyRequiredInput, isValid } from './Input';
import panelStyle from '../styles/panelStyle';

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
    'street    street   '
    'apartment apartment'
    'city      city     '
    'province  province '
    'country   country  '
    'postal    postal   '
    'button    .        ';
`;

const Main = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'summary'
    'contact-info';
  grid-template-columns: '1fr';
  grid-template-rows: 'auto auto';
`;

const SectionTitle = styled.h2`
  margin: 0;
  padding: 0 12px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  grid-area: title;
`;

const StyledSummary = styled(CartSummary)`
  ${panelStyle}
`;

const CheckoutPage = () => {
  const cart = useSelector(getCart);
  const [email, setEmail] = useState(emptyRequiredInput);
  const [street, setStreet] = useState(emptyRequiredInput);
  const [apartment, setApartment] = useState(emptyInput);
  const [city, setCity] = useState(emptyRequiredInput);
  const [province, setProvince] = useState(emptyRequiredInput);
  const [country, setCountry] = useState(emptyRequiredInput);
  const [postalCode, setPostalCode] = useState(emptyRequiredInput);
  const [step, setStep] = useState('contact');

  const navigateToShippingFormOrShowErrors = (event) => {
    event.preventDefault();
    if (isValid(email.validity)) setStep('shipping');
  };

  const navigateToBillingFormOrShowErrors = (event) => {
    event.preventDefault();
    const inputs = [
      street,
      apartment,
      city,
      province,
      country,
      postalCode,
    ];
    if (inputs.every(input => isValid(input.validity))) setStep('billing');
  };

  return (
    <Main>
      <StyledSummary cart={cart} />
      {step === 'contact' && (
        <ContactForm action="#">
          <SectionTitle>Contact Information</SectionTitle>
          <Input
            area="email"
            isRequired
            label="Email Address"
            type="email"
            onChange={setEmail}
            validity={email.validity}
            value={email.value}
          />
          <Button
            area="button"
            isFormSubmit
            onClick={navigateToShippingFormOrShowErrors}
          >
            Continue to shipping information
          </Button>
        </ContactForm>
      )}
      {step === 'shipping' && (
        <ShippingForm action='#'>
          <SectionTitle>Shipping Information</SectionTitle>
          <Input
            area="street"
            isRequired
            label="Street Address"
            onChange={setStreet}
            validity={street.validity}
            value={street.value}
          />
          <Input
            area="apartment"
            label="Apartment Number"
            type="number"
            onChange={setApartment}
            validity={apartment.validity}
            value={apartment.value}
          />
          <Input
            area="city"
            isRequired
            label="City"
            onChange={setCity}
            validity={city.validity}
            value={city.value}
          />
          <Input
            area="province"
            isRequired
            label="Province"
            onChange={setProvince}
            validity={province.validity}
            value={province.value}
          />
          <Input
            area="country"
            isRequired
            label="Country"
            onChange={setCountry}
            validity={country.validity}
            value={country.value}
          />
          <Input
            area="postal"
            isRequired
            label="Postal Code"
            onChange={setPostalCode}
            validity={postalCode.validity}
            value={postalCode.value}
          />
          <Button
            area="button"
            isFormSubmit
            onClick={navigateToBillingFormOrShowErrors}
          >
            Continue to billing information
          </Button>
        </ShippingForm>
      )}
      {step === 'billing' && (
        <Form>
          <SectionTitle>Billing Information</SectionTitle>
          <Button>Place order</Button>
        </Form>
      )}
    </Main>
  );
};

export default CheckoutPage;
