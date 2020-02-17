import api from 'services/api';
import {
  selectors as cartSelectors,
} from './cart';

const actionTypes = {
  CREATE_ORDER_FAILURE: 'create-order-failure',
  CREATE_ORDER_REQUEST: 'create-order-request',
  CREATE_ORDER_SUCCESS: 'create-order-success',
};

export const actions = {
  createOrder: (contact, destination) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    const cart = cartSelectors.getCart(getState());
    try {
      const order = await api.createOrder(contact, destination, cart);
      dispatch({ type: actionTypes.CREATE_ORDER_SUCCESS, payload: order });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_ORDER_FAILURE });
    }
  },
};

const initialState = {
  isCreatingOrder: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_FAILURE: {
      return {
        ...state,
        isCreatingOrder: false,
      };
    }

    case actionTypes.CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isCreatingOrder: true,
      };
    }

    case actionTypes.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isCreatingOrder: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const selectors = {};

export default reducer;
