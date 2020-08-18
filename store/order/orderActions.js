import { API_URL } from '../../constants/Config';
import { timeoutPromise } from '../../utils/Tools';
export const FETCH_ORDER = 'FETCH_ORDER';
export const ADD_ORDER = 'ADD_ORDER';

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
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'GET',
        })
      );
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
export const addOrder = (orderItems, name, totalAmount, fullAddress, phone) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/order/post`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'POST',
          body: JSON.stringify({
            userId: user.userid,
            items: orderItems,
            name,
            totalAmount,
            address: fullAddress,
            phone,
          }),
        })
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
