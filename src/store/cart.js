const initialState = {
  cart: [],
};

export const actions = {
  addCustomCardToCart: card => ({
    type: 'add-custom-card-to-cart',
    payload: card,
  }),

  removeItemFromCart: index => ({
    type: 'remove-item-from-cart',
    payload: index,
  }),

  updateCartItem: (item, index) => ({
    type: 'update-cart-item',
    payload: { item, index },
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

    case 'remove-item-from-cart': {
      const cart = state.cart.slice(0);
      cart.splice(action.payload, 1);
      return {
        ...state,
        cart,
      };
    }

    case 'update-cart-item': {
      const cart = state.cart.slice(0);
      cart[action.payload.index] = action.payload.item;
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

export const getCart = state => state.cart.cart;

export const getCartItem = (state, index) => {
  if (parseInt(index) === undefined) return {};
  return state.cart.cart[index];
}
