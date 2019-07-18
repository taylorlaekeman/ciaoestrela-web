import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './containers/Header';
import HomePage from './containers/HomePage';
import GlobalStyle from './styles/GlobalStyle';

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
