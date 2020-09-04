import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_ORDER = "FETCH_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const ERROR = "ERROR";

//Fetch order
export const fetchOrder = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    if (user.userid == undefined) {
      return;
    }
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/order`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "GET",
        })
      );
      if (!response.ok) {
        alert("Can't get Orders");
      }
      const resData = await response.json();
      const filterUserOrder = resData.content.filter(
        (userOrder) => userOrder.userId._id === user.userid
      );
      dispatch({
        type: "FETCH_ORDER",
        orderData: filterUserOrder,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Add order
export const addOrder = (
  token,
  orderItems,
  name,
  totalAmount,
  paymentMethod,
  fullAddress,
  phone
) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/order/post`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "POST",
          body: JSON.stringify({
            token,
            orderInfo: {
              userId: user.userid,
              items: orderItems,
              name,
              totalAmount,
              paymentMethod,
              address: fullAddress,
              phone,
            },
          }),
        })
      );
      if (!response.ok) {
        return dispatch({
          type: "ERROR",
          error: "Ordering Error",
        });
      }
      const resData = await response.json();
      dispatch({
        type: "ADD_ORDER",
        orderItem: resData.content,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};
