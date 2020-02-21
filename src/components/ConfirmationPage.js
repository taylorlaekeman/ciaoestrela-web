import React from 'react';
import styled from 'styled-components';

import ConfirmationImage from 'assets/images/confirm.png';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'article'
    'image  ';
  grid-row-gap: 20px;

  @media (min-width: 560px) {
    grid-template-areas:
      'article .'
      'image   .';
    grid-template-columns: 520px 1fr;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      'image article'
      'image .      ';
    grid-column-gap: 20px;
    grid-template-columns: 1fr 500px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. image . article .'
      '. image . .       .';
    grid-column-gap: 0;
    grid-template-columns: 1fr 600px 20px 500px 1fr;
  }
`;

const Image = styled.img`
  grid-area: image;
  width: 100%;
`;

const Article = styled.article`
  grid-area: article;
  ${props => props.theme.panel}
  display: grid;
  grid-gap: 10px;
`;

const Heading = styled.h2`
  margin: 0;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const ConfirmationPage = () => (
  <Main>
    <Image src={ConfirmationImage} alt="Ciao, Estrela: the text 'thank you for your order' in a speech bubble with hearts, on a background with a smiling sun, stars, and a sleeping lion" />
    <Article>
      <Heading>Check your email!</Heading>
      <Paragraph>You should get a confirmation email from me very soon.</Paragraph>
    </Article>
  </Main>
);

export default ConfirmationPage;
