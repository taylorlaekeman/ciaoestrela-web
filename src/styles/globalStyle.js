import { createGlobalStyle } from 'styled-components';
import colours from './colours';
import fonts from './fonts';

const globalStyle = createGlobalStyle`
  @import url(${fonts.importUrl});

  html {
    background-color: ${colours.green['200']};
    font-size: 16px;
  }

  body {
    margin: 0px;
    margin-top: 4px;
    font-family: ${fonts.body}, ${fonts.fallback};
    font-weight: 300;
    background-color: ${colours.grey['200']};
    color: ${colours.grey['400']};
  }

  main {
    padding: 20px;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 300;
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 300;
  }

  h3 {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export default globalStyle;
