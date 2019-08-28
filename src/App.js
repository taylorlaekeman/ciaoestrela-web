import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutPage from './containers/AboutPage';
import GalleryPage from './containers/GalleryPage';
import GlobalStyle from './styles/GlobalStyle';
import Header from './containers/Header';
import HomePage from './containers/HomePage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/gallery" component={GalleryPage} />
    </BrowserRouter>
  );
}

export default App;
