import React from 'react';
import styled from 'styled-components';
import CactusCard from '../assets/images/cactus-card.png';
import CookiesCard from '../assets/images/cookies-card.png';
import GownCard from '../assets/images/gown-card.png';
import HouseCard from '../assets/images/house-card.png';
import JaneAustenCard from '../assets/images/jane-austen-card.png';
import PigCard from '../assets/images/pig-card.png';
import RosesCard from '../assets/images/roses-card.png';
import WeddingCard from '../assets/images/wedding-card.png';
import WhistleCard from '../assets/images/whistle-card.png';
import YurtCard from '../assets/images/yurt-card.png';
import ZodiacCard from '../assets/images/zodiac-card.png';

const Main = styled.main`
  display: grid;
  grid-gap: 20px;
  grid-template-areas: 
    'wedding    '
    'whistle    '
    'roses      '
    'zodiac     '
    'cactus     '
    'jane-austen'
    'cookies    '
    'house      '
    'gown       '
    'pig        '
    'yurt       ';

  @media (min-width: 540px) {
    grid-template-areas:
      'wedding whistle    '
      'roses   zodiac     '
      'cactus  jane-austen'
      'cookies house      '
      'gown    pig        '
      'yurt    .          ';
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }

  @media (min-width: 740px) {
    grid-template-areas:
      'wedding whistle roses      '
      'zodiac  cactus  jane-austen'
      'cookies house   gown       '
      'pig     .       yurt       ';
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1160px) {
    grid-template-areas:
      '. wedding . whistle . roses       .'
      '. zodiac  . cactus  . jane-austen .'
      '. cookies . house   . gown        .'
      '. pig     . .       . yurt        .';
    grid-template-columns: 1fr 360px 20px 360px 20px 360px 1fr;
    grid-column-gap: 0;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const CactusImage = styled(Image)`
  grid-area: cactus;
`;

const CookiesImage = styled(Image)`
  grid-area: cookies;
`;

const GownImage = styled(Image)`
  grid-area: gown;
`;

const HouseImage = styled(Image)`
  grid-area: house;
`;

const JaneAustenImage = styled(Image)`
  grid-area: jane-austen;
`;

const PigImage = styled(Image)`
  grid-area: pig;
`;

const RosesImage = styled(Image)`
  grid-area: roses;
`;

const WeddingImage = styled(Image)`
  grid-area: wedding;
`;

const WhistleImage = styled(Image)`
  grid-area: whistle;
`;

const YurtImage = styled(Image)`
  grid-area: yurt;
`;

const ZodiacImage = styled(Image)`
  grid-area: zodiac;
`;

const GalleryPage = () => (
  <Main>
    <WeddingImage src={WeddingCard} alt="Ciao, Estrela Co. card; a couple embracing after their wedding ceremony surrounded by floral decorations over a banner reading 'The Shewinis'" />
    <WhistleImage src={WhistleCard} alt="Ciao, Estrela Co. card; silver metal with red lanyard, with a speech bubble saying 'Happy Mother's Day!'" />
    <RosesImage src={RosesCard} alt="Ciao, Estrela Co. card; a bouquet of roses and honeysuckle" />
    <ZodiacImage src={ZodiacCard} alt="Ciao, Estrela Co. card; taurus the bull speaking with leo the lion, saying 'Me? Stubborn? No way!!'" />
    <CactusImage src={CactusCard} alt="Ciao, Estrela Co. card; two cacti, one saying to the other 'Thank you for helping me grow!'" />
    <JaneAustenImage src={JaneAustenCard} alt="Ciao, Estrela Co. card; two silhouettes facing eachother overlayed over text from Jane Austen's 'Great Expectations'" />
    <CookiesImage src={CookiesCard} alt="Ciao, Estrela Co. card; a pile of chocolate-chip cookies sitting on a napkin in front of the text 'happy mother's day'" />
    <HouseImage src={HouseCard} alt="Ciao, Estrela Co. card; clouds cut-out of spotted paper over a house cut-out of black paper with an engagement ring in the center of it over the text 'congrats!'" />
    <GownImage src={GownCard} alt="Ciao, Estrela Co. card; a wedding gown on a hangar, cut out from floral-print paper beside the text 'for the bride-to-be...'" />
    <PigImage src={PigCard} alt="Ciao, Estrela Co. card; cartoon pig hanging from a grey party balloon, floating through the sky" />
    <YurtImage src={YurtCard} alt="Ciao, Estrela Co. card; two women flying a rainbow kite in an open field, with a campfire, part of a yurt, and green mountains in the background" />
  </Main>
);

export default GalleryPage;
