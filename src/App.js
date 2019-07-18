import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './containers/Header';
import HomePage from './containers/HomePage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Route path="/" component={HomePage} />
    </BrowserRouter>
  );
}

export default App;
