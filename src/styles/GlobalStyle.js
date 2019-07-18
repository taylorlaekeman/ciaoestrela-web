import { createGlobalStyle } from 'styled-components';
import Colours from './Colours';
import Fonts from './Fonts';

const GlobalStyle = createGlobalStyle`
  @import url(${Fonts.importUrl});

  html {
    background-color: ${Colours['green-200']};
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

  body, p {
    font-size: 0.9em;
  }

  h1 {
    font-size: 1.6em;
    font-weight: 300;
  }

  h2 {
    font-size: 1.4em;
  }

  h3 {
    font-size: 1.2em;
  }
`;

export default GlobalStyle;
