import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducers as cartReducers } from './cart';

const reducers = combineReducers({
  cart: cartReducers,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
