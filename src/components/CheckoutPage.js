import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Address from './Address';
import Button from './Button';
import CartSummary from './CartSummary';
import { getCart } from '../store/cart';
import Input, { emptyInput, emptyRequiredInput } from './Input';
import panelStyle from '../styles/panelStyle';

const Form = styled.form`
  ${panelStyle}
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
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

const BillingForm = styled(Form)`
  grid-template-areas:
    'title    title   '
    'credit   credit  '
    'expiry   expiry  '
    'security security'
    'button   .       ';
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

const Email = styled.p`
  margin: 0;
  padding: 0 20px;
  ${panelStyle}
`;

const StyledAddress = styled(Address)`
  ${panelStyle}
`;

const isValid = field => field.validity.valid;

const CheckoutPage = () => {
  const cart = useSelector(getCart);
  const [email, setEmail] = useState(emptyRequiredInput);
  const [street, setStreet] = useState(emptyRequiredInput);
  const [apartment, setApartment] = useState(emptyInput);
  const [city, setCity] = useState(emptyRequiredInput);
  const [province, setProvince] = useState(emptyRequiredInput);
  const [country, setCountry] = useState(emptyRequiredInput);
  const [postalCode, setPostalCode] = useState(emptyRequiredInput);
  const [areErrorsVisible, setAreErrorsVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState(emptyRequiredInput);
  const [expiry, setExpiry] = useState(emptyRequiredInput);
  const [security, setSecurity] = useState(emptyRequiredInput);
  const [step, setStep] = useState('contact');

  const navigateToShippingFormOrShowErrors = (event) => {
    event.preventDefault();
    if (isValid(email)) {
      setAreErrorsVisible(false);
      setStep('shipping');
    } else {
      setAreErrorsVisible(true);
    }
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
    if (inputs.every(input => isValid(input))) {
      setAreErrorsVisible(false);
      setStep('billing');
    } else {
      setAreErrorsVisible(true);
    }
  };

  const placeOrder = (event) => {
    event.preventDefault();
  };

  return (
    <Main>
      <StyledSummary cart={cart} />
      {
        step === 'contact'
          ? (
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
              <Button
                area="button"
                isFormSubmit
                onClick={navigateToShippingFormOrShowErrors}
              >
                Continue to shipping information
              </Button>
            </ContactForm>
          )
          :(
            <Email>{email.value}</Email>
          )
      }
      {step === 'shipping' && (
        <ShippingForm action="#">
          <SectionTitle>Shipping Information</SectionTitle>
          <Input
            area="street"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Street Address"
            onChange={setStreet}
            validity={street.validity}
            value={street.value}
          />
          <Input
            area="apartment"
            areErrorsVisible={areErrorsVisible}
            label="Apartment Number"
            type="number"
            onChange={setApartment}
            validity={apartment.validity}
            value={apartment.value}
          />
          <Input
            area="city"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="City"
            onChange={setCity}
            validity={city.validity}
            value={city.value}
          />
          <Input
            area="province"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Province"
            onChange={setProvince}
            validity={province.validity}
            value={province.value}
          />
          <Input
            area="country"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Country"
            onChange={setCountry}
            validity={country.validity}
            value={country.value}
          />
          <Input
            area="postal"
            areErrorsVisible={areErrorsVisible}
            isRequired
            label="Postal Code"
            maxLength="6"
            minLength="6"
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
        <StyledAddress
          apartment={apartment.value}
          city={city.value}
          country={country.value}
          postalCode={postalCode.value}
          province={province.value}
          street={street.value}
        />
      )}
      {step === 'billing' && (
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
      )}
    </Main>
  );
};

export default CheckoutPage;
