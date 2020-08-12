import { AsyncStorage, Alert } from 'react-native';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const FETCH_CART = 'FETCH_CART';
export const ADD_CART = 'ADD_CART';
export const RESET_CART = 'RESET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DES_CART_QUANTITY = 'DES_CART_QUANTITY';
export const FETCH_ORDER = 'FETCH_ORDER';
export const ADD_ORDER = 'ADD_ORDER';
export const FIRST_OPEN = 'FIRST_OPEN';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

import AskingExpoToken from '../components/Notification/AskingNotiPermission';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://192.168.0.27:8080/api/v1/product', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error("Something went wrong!, can't get the products");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: resData.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
//Add Favorite
export const addFavorite = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_FAVORITE',
      id,
    });
  };
};
export const removeFavorite = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_FAVORITE',
      productId: id,
    });
  };
};

//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    const emptyCart = {
      items: [],
    };
    if (user.userid != undefined) {
      try {
        const response = await fetch('http://192.168.0.27:8080/api/v1/cart', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error("Something went wrong!, can't get the products");
        }
        const resData = await response.json();

        const filterUserCart = resData.content.filter(
          (userCart) => userCart.userId === user.userid
        );

        dispatch({
          type: FETCH_CART,
          carts:
            resData.content.length !== 0 &&
            filterUserCart !== undefined &&
            filterUserCart.length > 0
              ? filterUserCart[0]
              : emptyCart,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({
        type: FETCH_CART,
        carts: emptyCart,
        cartId: '',
      });
    }
  };
};
//Add Add to Cart
export const addToCart = (item, token) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    if (Object.keys(user).length === 0) {
      Alert.alert('Đăng Nhập', 'Bạn cần đăng nhập để mua hàng', [
        {
          text: 'OK',
        },
      ]);
    }

    try {
      const response = await fetch(
        'http://192.168.0.27:8080/api/v1/cart/post',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token,
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
        }
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
      const response = await fetch(
        `http://192.168.0.27:8080/api/v1/cart/cartitem/${cartId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'DELETE',
          body: JSON.stringify({
            item: itemId,
          }),
        }
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
      const response = await fetch(
        `http://192.168.0.27:8080/api/v1/cart/cartitem/${cartId}`,
        {
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
        }
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
      const response = await fetch(
        `http://192.168.0.27:8080/api/v1/cart/${cartId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'DELETE',
        }
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
//Fetch order
export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    if (user.userid == undefined) {
      return;
    }
    try {
      const response = await fetch('http://192.168.0.27:8080/api/v1/order/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': user.token,
        },
        method: 'GET',
      });
      if (!response.ok) {
        alert('Order Error');
        return;
      }
      const resData = await response.json();
      const filterUserOrder = resData.content.filter(
        (userOrder) => userOrder.userId._id === user.userid
      );
      dispatch({
        type: 'FETCH_ORDER',
        orderData: filterUserOrder,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Add order
export const addOrder = (orderItems, totalAmount, fullAddress, phone) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await fetch(
        'http://192.168.0.27:8080/api/v1/order/post',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'POST',
          body: JSON.stringify({
            userId: user.userid,
            items: orderItems,
            totalAmount,
            address: fullAddress,
            phone,
          }),
        }
      );
      if (!response.ok) {
        alert('Order Error');
        return;
      }
      const resData = await response.json();
      dispatch({
        type: 'ADD_ORDER',
        orderItem: resData.content,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    })
    //convert to string, but when you access in startup screen, have to convert to javascript object or array
  );
};

//Check first Open
export const firstOpen = () => {
  saveDataToStorage('isFirstTime', 'First Time Open the App');
  // AsyncStorage.removeItem("isFirstTime");
  return {
    type: 'FIRST_OPEN',
  };
};

export const SignUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://192.168.0.27:8080/api/v1/user/register',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
      }
      const resData = await response.json();
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const ForgetPassword = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://192.168.0.27:8080/api/v1/user/reset_pw',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
      }
      const resData = await response.json();
      dispatch({
        type: FORGET_PASSWORD,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
export const ResetPassword = (password, url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://192.168.0.27:8080/api/v1/user/receive_new_password/${url.userid}/${url.token}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            password,
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
      }

      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer(); //clear setTimeout when logout
    AsyncStorage.removeItem('user');
    alert('Logout section expired');
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    const pushToken = await AskingExpoToken();
    try {
      const response = await fetch(
        'http://192.168.0.27:8080/api/v1/user/login',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            pushTokens: [pushToken],
          }),
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
        dispatch({
          type: LOGIN,
          user: {},
          error: errorResData.err,
        });
      }
      const resData = await response.json();
      saveDataToStorage('user', resData);
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: resData,
        error: {},
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert('Logout section expired');
    }, expirationTime);
  };
};
