import { combineReducers, createStore } from 'redux';
import { reducers as cartReducers } from './cart';

const reducers = combineReducers({
  cart: cartReducers,
});

const store = createStore(reducers);

export default store;
