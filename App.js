import React, { useState } from "react";
//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import Reducers from "./store/reducers";
//Navigator
import AppNavigator from "./navigation/AppNavigator";
//redux form
import { reducer as formReducer } from "redux-form";
//Fonts
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { AppLoading } from "expo";

//Notification
import LocalNotication from "./components/Notification/LocalNotification";

const rootReducer = combineReducers({
  store: Reducers.ProductReducer,
  cart: Reducers.CartReducer,
  order: Reducers.OrderReducer,
  auth: Reducers.AuthReducer,
  fav: Reducers.FavoriteReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <LocalNotication />
      <AppNavigator />
    </Provider>
  );
}
