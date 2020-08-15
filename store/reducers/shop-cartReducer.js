import { Cart } from '../../models/Cart';
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  DES_CART_QUANTITY,
  RESET_CART,
} from '../actions/cartActions';

const emptyCart = {
  items: [],
};
const initialState = {
  items: {},
  cartItems: emptyCart,
};

const findIndex = (cartList, id) => {
  const index = cartList.findIndex((cart) => {
    return cart.item._id === id;
  });
  return index;
};
export default (state = initialState, action) => {
  const cartList = state.cartItems.items;
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        cartItems: action.carts,
      };

    case ADD_CART:
      const id = action.cartItem._id;
      if (cartList.length !== 0) {
        const index = findIndex(cartList, id);
        if (index >= 0) {
          cartList[index] = new Cart(
            action.cartItem,
            +cartList[index].quantity + 1
          );
        } else {
          const newItem = new Cart(action.cartItem, 1);
          cartList.push(newItem);
        }
      } else {
        const newItem = new Cart(action.cartItem, 1);
        cartList.push(newItem);
      }

      return {
        ...state,
        cartItems: { ...state.cartItems },
      };
    case REMOVE_FROM_CART:
      const { itemId } = action;
      const indexItem = findIndex(cartList, itemId);
      cartList.splice(indexItem, 1);
      return {
        ...state,
        cartItems: { ...state.cartItems },
      };
    case DES_CART_QUANTITY:
      const { cartItemId } = action;
      const index = findIndex(cartList, cartItemId);
      cartList[index].quantity = +cartList[index].quantity - 1;
      return {
        ...state,
        cartItems: { ...state.cartItems },
      };
    case RESET_CART:
      state.cartItems.items = [];
      return {
        ...state,
        cartItems: { ...state.cartItems },
      };
  }
  return state;
};
