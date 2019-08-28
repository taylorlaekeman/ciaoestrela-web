import React from 'react';
import styled from 'styled-components';
import AboutImage from '../assets/images/about.png';
import AboutTextBoxImage from '../assets/images/about-text-box.png';

const Main = styled.main`
  display: grid;
  grid-template-areas:
    'about-text-box'
    'about         ';
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 540px) {
    grid-template-areas:
      '. about-text-box'
      '. about         ';
    grid-template-columns: 1fr 500px;
    grid-column-gap: 0;
  }

  @media (min-width: 1060px) {
    grid-template-areas:
      'about . about-text-box';
    grid-template-columns: 500px 1fr 500px;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. about . about-text-box .';
    grid-template-columns: 1fr 500px 120px 500px 1fr;
  }
`;

const AboutImg = styled.img`
  grid-area: about;
  width: 100%;
`;

const AboutTextBoxImg = styled.img`
  grid-area: about-text-box;
  width: 100%;
`;

const AboutPage = () => {
  return (
    <Main>
      <AboutImg src={AboutImage} alt="Ciao, Estrela portrait with sun and quotation" />
      <AboutTextBoxImg src={AboutTextBoxImage} alt="Ciao, Estrela speech bubble with fronds" />
    </Main>
  );
};

export default AboutPage;
