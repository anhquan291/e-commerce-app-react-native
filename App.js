import React from "react";
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
import { StatusBar } from "expo-status-bar";

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

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <LocalNotication />
      <AppNavigator />
    </Provider>
  );
}
