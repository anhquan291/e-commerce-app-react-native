import { ADD_ORDER, FETCH_ORDER } from './orderActions';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return { ...state, orders: action.orderData };
    case ADD_ORDER:
      const newOrder = action.orderItem;
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};
