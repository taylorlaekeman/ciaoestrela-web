const initialState = {
  cart: [],
};

export const actions = {
  addCustomCardToCart: card => ({
    type: 'add-custom-card-to-cart',
    payload: card,
  }),
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'add-custom-card-to-cart': {
      const cart = state.cart.slice(0);
      cart.push(action.payload);
      return {
        ...state,
        cart,
      };
    }

    default: {
      if (action.type.indexOf('@@redux') === -1) console.log(`received unhandled action "${action.type}"`);
      return state;
    }
  }
};
