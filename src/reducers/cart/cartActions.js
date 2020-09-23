import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const FETCH_CART = "FETCH_CART";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DES_CART_QUANTITY = "DES_CART_QUANTITY";

//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    if (user.userid != undefined) {
      dispatch({
        type: CART_LOADING,
      });
      try {
        const response = await timeoutPromise(
          fetch(`${API_URL}/cart`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
            method: "GET",
          })
        );
        if (!response.ok) {
          dispatch({
            type: CART_FAILURE,
          });
          throw new Error("Something went wrong!, can't get your carts");
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
        throw err;
      }
    }
    return;
  };
};
//Add Add to Cart
export const addToCart = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/post`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "POST",
          body: JSON.stringify({
            userId: user.userid,
            items: [
              {
                item: item._id,
                quantity: 1,
              },
            ],
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "ADD_CART",
        cartItem: item,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Remove from Cart
export const removeFromCart = (cartId, itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/cartitem/${cartId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "DELETE",
          body: JSON.stringify({
            item: itemId,
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "REMOVE_FROM_CART",
        itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};
//Decrease cart quantity
export const decCartQuantity = (cartId, itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/cartitem/${cartId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "PUT",
          body: JSON.stringify({
            item: itemId,
            quantity: "decrease",
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "DES_CART_QUANTITY",
        cartItemId: itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Reset Cart
export const resetCart = (cartId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/${cartId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "DELETE",
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: "RESET_CART",
      });
    } catch (err) {
      throw err;
    }
  };
};
