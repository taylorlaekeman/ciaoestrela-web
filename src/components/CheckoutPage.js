import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Address from './Address';
import Button from './Button';
import CartSummary from './CartSummary';
import CheckoutBottomImage from '../assets/images/checkout-bottom.png';
import CheckoutTopImage from '../assets/images/checkout-top.png';
import { getCart } from '../store/cart';
import iconStyle from '../styles/iconStyle';
import Image from './Image';
import Input, { emptyInput, emptyRequiredInput } from './Input';
import panelStyle from '../styles/panelStyle';
import { ReactComponent as UnstyledEdit } from '../assets/icons/pencil.svg';

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

const Section = styled.section`
  ${panelStyle}
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'header edit .'
    'info   .    .';
  grid-template-columns: auto auto 1fr;
`;

const Email = styled.p`
  margin: 0;
  grid-area: info;
`;

const Edit = styled(UnstyledEdit)`
  ${props => (props.area ? `grid-area: ${props.area};` : '')}
  ${iconStyle}
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
  const [isContactFormEditable, setIsContactFormEditable] = useState(true);
  const [isShippingFormEditable, setIsShippingFormEditable] = useState(false);
  const [isBillingFormEditable, setIsBillingFormEditable] = useState(false);

  const navigateToShippingFormOrShowErrors = (event) => {
    event.preventDefault();
    if (isValid(email)) {
      setAreErrorsVisible(false);
      setIsContactFormEditable(false);
      setIsShippingFormEditable(true);
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
      setIsShippingFormEditable(false);
      setIsBillingFormEditable(true);
    } else {
      setAreErrorsVisible(true);
    }
  };

  const placeOrder = (event) => {
    event.preventDefault();
  };

  return (
    <Main>
      <Forms>
        <StyledSummary cart={cart} />
        {isContactFormEditable && (
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
            {!isShippingFormEditable && !isBillingFormEditable && (
              <Button
                area="button"
                isFormSubmit
                onClick={navigateToShippingFormOrShowErrors}
              >
                Continue to shipping information
              </Button>
            )}
          </ContactForm>
        )}
        {!isContactFormEditable && (
          <Section>
            <header>Contact Information</header>
            <Edit area="edit" onClick={() => setIsContactFormEditable(true)} />
            <Email>{email.value}</Email>
          </Section>
        )}
        {isShippingFormEditable && (
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
            {!isBillingFormEditable && (
              <Button
                area="button"
                isFormSubmit
                onClick={navigateToBillingFormOrShowErrors}
              >
                Continue to billing information
              </Button>
            )}
          </ShippingForm>
        )}
        {isBillingFormEditable && !isShippingFormEditable && (
          <Section>
            <header>Shipping Information</header>
            <Edit onClick={() => setIsShippingFormEditable(true)} />
            <Address
              area="info"
              apartment={apartment.value}
              city={city.value}
              country={country.value}
              postalCode={postalCode.value}
              province={province.value}
              street={street.value}
            />
          </Section>
        )}
        {isBillingFormEditable && (
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
