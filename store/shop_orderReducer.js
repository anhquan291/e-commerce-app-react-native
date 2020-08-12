import Order from "../models/order";
import { ADD_ORDER } from "./shop-actions";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.name,
        action.orderData.items,
        action.orderData.total,
        action.orderData.address,
        action.orderData.phone,
        action.orderData.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};
