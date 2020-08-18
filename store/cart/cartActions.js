import { API_URL } from '../../constants/Config';
import { timeoutPromise } from '../../utils/Tools';
export const FETCH_CART = 'FETCH_CART';
export const ADD_CART = 'ADD_CART';
export const RESET_CART = 'RESET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DES_CART_QUANTITY = 'DES_CART_QUANTITY';

//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    if (user.userid != undefined) {
      try {
        const response = await timeoutPromise(
          fetch(`${API_URL}/cart`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'auth-token': user.token,
            },
            method: 'GET',
          })
        );
        if (!response.ok) {
          throw new Error("Something went wrong!, can't get the products");
        }
        const resData = await response.json();
        const filterUserCart = resData.content.filter(
          (userCart) => userCart.userId === user.userid
        );
        let carts = emptyCart;
        if (filterUserCart.length > 0) {
          carts = filterUserCart[0];
        }

        dispatch({
          type: FETCH_CART,
          carts,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };
};
//Add Add to Cart
export const addToCart = (item) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/post`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'POST',
          body: JSON.stringify({
            userId: user.userid,
            items: [
              {
                item: item._id,
                quantity: '1',
              },
            ],
          }),
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData);
      }
      const resData = await response.json();
      dispatch({
        type: 'ADD_CART',
        cartItem: item,
      });
      // console.log(resData);
    } catch (err) {
      console.log(err.message);
      Alert.alert('Error', err.message, [
        {
          text: 'OK',
        },
      ]);
    }
  };
};

//Remove from Cart
export const removeFromCart = (cartId, itemId) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/cartitem/${cartId}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'DELETE',
          body: JSON.stringify({
            item: itemId,
          }),
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData);
      }
      dispatch({
        type: 'REMOVE_FROM_CART',
        itemId,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
//Decrease cart quantity
export const decCartQuantity = (cartId, itemId) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/cartitem/${cartId}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'PUT',
          body: JSON.stringify({
            item: itemId,
            quantity: 'decrease',
          }),
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData);
      }
      dispatch({
        type: 'DES_CART_QUANTITY',
        cartItemId: itemId,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Reset Cart
export const resetCart = (cartId) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/${cartId}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'DELETE',
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData);
      }

      dispatch({
        type: 'RESET_CART',
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
