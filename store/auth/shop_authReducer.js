import {
  LOGIN,
  LOGOUT,
  EDIT_INFO,
  UPLOAD_PROFILEPIC,
  LOGIN_ERROR,
  SIGN_UP,
} from "./authActions";
import { AsyncStorage } from "react-native";
import UserMessages from "../../messages/user";

const initialState = {
  user: {},
  error: "",
  notification: {},
};
//set user if token doesn't expire yet
const userInformation = async () => {
  const getUser = await AsyncStorage.getItem("user");
  if (!getUser) {
    return (initialState.user = {});
  }
  const parsedUser = await JSON.parse(getUser);
  return (initialState.user = parsedUser.data);
};
userInformation();

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        notification: UserMessages["user.login.success"],
      };
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        error: action.error,
      };
    }
    case LOGOUT:
      return {
        user: {},
        error: {},
        notification: UserMessages["user.logout.sucesss"],
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
      };
    case UPLOAD_PROFILEPIC:
      state.user.profilePicture = action.profilePic;
      return {
        ...state,
        user: {
          ...state.user,
        },
      };
  }
  return state;
};
