import React from "react";
//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//Reducer
import {
  authReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  productReducer,
} from "./store";
//Navigator
import AppNavigator from "./navigation/AppNavigator";
//redux form
import { reducer as formReducer } from "redux-form";
import { StatusBar } from "expo-status-bar";

//Notification
import LocalNotication from "./components/Notification/LocalNotification";

const rootReducer = combineReducers({
  store: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  fav: favoriteReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <LocalNotication />
      <AppNavigator />
    </Provider>
  );
}
