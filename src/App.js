import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AboutPage from './components/AboutPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import GalleryPage from './components/GalleryPage';
import GlobalStyle from './styles/globalStyle';
import Header from './components/Header';
import HomePage from './components/HomePage';
import OrderPage from './components/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/order" exact component={OrderPage} />
      <Route path="/order/:index" component={OrderPage} />
    </BrowserRouter>
  );
}

export default App;
