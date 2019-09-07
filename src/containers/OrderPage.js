import React, { useState } from 'react';
import styled from 'styled-components';
import boxShadow from '../styles/boxShadow';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import UnstyledSelect from '../components/Select';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    "form";

  @media (min-width: 540px) {
    grid-template-areas:
      ". form";
    grid-template-columns: 1fr 500px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      ". . form .";
    grid-template-columns: 1fr 620px 500px 1fr;
  }
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: ${boxShadow};
  grid-area: form;

  display: grid;
  grid-template-areas:
    'cardstock   cardstock  '
    'select      select     '
    'ideas-label ideas-label'
    'ideas       ideas      '
    'submit      .          ';
  grid-template-columns: min-content 1fr;
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
`;

const Input = styled.input`
  color: ${colours.green[600]};
  background: ${colours.green[300]};
  box-shadow: ${boxShadow};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  display: block;
  grid-area: submit;
`;

const OrderPage = () => {
  const [selected, setSelected] = useState();

  return (
    <Main>
      <Form>
        <CardstockLabel>Which cardstock would you like me to use to make your card?</CardstockLabel>

        <Select
          onSelect={setSelected}
          options={["4\" x 5.5\" white", "4\" x 5.5\" ivory", "4\" x 5.5\" brown", "5\" x 6.5\" white"]}
          selected={selected}
        />

        <IdeasLabel>Please share any information you think might be useful!</IdeasLabel>
        <IdeasTextarea />

        <Input type="submit" value="Add to cart"/>
      </Form>
    </Main>
  );
};

export default OrderPage;
