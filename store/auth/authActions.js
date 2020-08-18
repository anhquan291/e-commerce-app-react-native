import { AsyncStorage } from 'react-native';
import { API_URL } from '../../constants/Config';
import { timeoutPromise } from '../../utils/Tools';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

import AskingExpoToken from '../../components/Notification/AskingNotiPermission';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    })
  );
};

export const SignUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/register`, {
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
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    const pushToken = await AskingExpoToken();
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/login`, {
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
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        alert(errorResData.err);
      }
      const resData = await response.json();
      saveDataToStorage('user', resData);
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: resData,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const ForgetPassword = (email) => {
  return async (dispatch) => {
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/reset_pw`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        })
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
      const response = await timeoutPromise(
        fetch(
          `${API_URL}/user/receive_new_password/${url.userid}/${url.token}`,
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
        )
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
