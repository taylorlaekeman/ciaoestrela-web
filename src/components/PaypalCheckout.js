import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';

const clientId = 'Adc0UfxP7gbBCHKIhYCXgVhEVzBcGUkp8Bf-tDd5iEf3onyLQIOeyHUwX0PcGYGSrfyVmwLjOTjQbLfV';

const paypalScriptUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD`;

const getOrderBuilder = amount => (data, actions) => actions.order.create({
  purchase_units: [{
    amount: {
      value: `${amount}`,
    },
  }],
});

const onApprove = () => {
  console.log('on approve');
};

const onError = () => {
  console.log('on error');
};

const PaypalCheckout = ({ isScriptLoaded }) => {
  if (isScriptLoaded) {
    paypal.Buttons({ // eslint-disable-line
      createOrder: getOrderBuilder(0.01),
      onApprove,
      onError,
    }).render('#paypal-button');
  }
  return (
    <div>
      <div id="paypal-button" />
      {!isScriptLoaded && (<div>loading...</div>)}
    </div>
  );
};

PaypalCheckout.propTypes = {
  isScriptLoaded: PropTypes.bool.isRequired,
};

export default scriptLoader(paypalScriptUrl)(PaypalCheckout);
