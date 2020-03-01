import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { ThemeProvider } from 'styled-components';

import AboutPage from 'components/AboutPage';
import CartPage from 'components/CartPage';
import CheckoutPage from 'components/CheckoutPage';
import ConfirmationPage from 'components/ConfirmationPage';
import Footer from 'components/Footer';
import GalleryPage from 'components/GalleryPage';
import Header from 'components/Header';
import HomePage from 'components/HomePage';
import OrderPage from 'components/OrderPage';
import GlobalStyle from 'styles/globalStyle';
import theme from 'styles';

const { STRIPE_PUBLIC_KEY } = window.env;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
        <Elements>
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
            <Route path="/thanks" component={ConfirmationPage} />
            <Footer />
          </BrowserRouter>
        </Elements>
      </StripeProvider>
    </ThemeProvider>
  );
}

export default App;
