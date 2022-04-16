import {
  AUTH_LOADING,
  LOGIN,
  LOGOUT,
  EDIT_INFO,
  UPLOAD_PROFILEPIC,
  SIGN_UP,
  AUTH_FAILURE,
  FORGET_PASSWORD,
  RESET_PASSWORD,
} from './authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserMessages from '../../messages/user';

const initialState = {
  user: {},
  notification: {},
  isLoading: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  //set user if token doesn't expire yet
  const userInformation = async () => {
    const getUser = await AsyncStorage.getItem('user');
    if (!getUser) {
      return initialState;
    }
    const parsedUser = await JSON.parse(getUser);
    return (initialState.user = parsedUser.data);
  };
  userInformation();

  switch (action.type) {
    case AUTH_LOADING: {
      return {
        ...state,
        isLoading: true,
        // error: false,
      };
    }
    case LOGIN:
      return {
        user: action.user,
        notification: UserMessages['user.login.success'],
        isLoading: false,
      };
    case SIGN_UP: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: {},
        notification: UserMessages['user.logout.sucesss'],
        isLoading: false,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_INFO:
      state.user.phone = action.phone;
      state.user.address = action.address;
      //Return ...state.user make the comp rerender
      return {
        ...state,
        user: {
          ...state.user,
        },
        isLoading: false,
      };
    case UPLOAD_PROFILEPIC:
      state.user.profilePicture = action.profilePic;
      return {
        ...state,
        user: {
          ...state.user,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};
