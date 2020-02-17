import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducers as cartReducers } from './cart';
import orderReducers from './orders';

const reducers = combineReducers({
  cart: cartReducers,
  orders: orderReducers,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
