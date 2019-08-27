import { createGlobalStyle } from 'styled-components';
import Colours from './Colours';
import Fonts from './Fonts';

const GlobalStyle = createGlobalStyle`
  @import url(${Fonts.importUrl});

  html {
    background-color: ${Colours['green-200']};
    font-size: 16px;
  }

  body {
    margin: 0px;
    margin-top: 4px;
    font-family: ${Fonts.body}, ${Fonts.fallback};
    font-weight: 300;
    background-color: ${Colours['grey-200']};
    color: ${Colours['grey-400']};
    height: 100vh;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 300;
  }

  h2 {
    font-size: 2rem;
    font-weight: 300;
  }

  h3 {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export default GlobalStyle;
