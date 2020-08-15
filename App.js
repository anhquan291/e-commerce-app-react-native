import React, { useState } from 'react';
//Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//Reducer
import ProductReducer from './store/reducers/shop-productReducer';
import CartReducer from './store/reducers/shop-cartReducer';
import OrderReducer from './store/reducers/shop_orderReducer';
import AuthReducer from './store/reducers/shop_authReducer';
import FavoriteReducer from './store/reducers/shop-favoriteReducer';
//Navigator
import AppNavigator from './navigation/AppNavigator';
//redux form
import { reducer as formReducer } from 'redux-form';
//Fonts
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//Notification
import LocalNotication from './components/Notification/LocalNotification';

const rootReducer = combineReducers({
  store: ProductReducer,
  cart: CartReducer,
  order: OrderReducer,
  auth: AuthReducer,
  fav: FavoriteReducer,
  form: formReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
  return Font.loadAsync({
    geoMetric: require('./assets/Fonts/GMV_URW_Geometric-Regular.otf'),
    geoMetricBold: require('./assets/Fonts/GMV_URW_Geometric-Bold.otf'),
    geoMetricBoldItalic: require('./assets/Fonts/GMV_URW_Geometric-Bold_Italic.otf'),
    geoMetricSemiBold: require('./assets/Fonts/GMV_URW_Geometric-SemiBold.otf'),
    geoMetricMedium: require('./assets/Fonts/GMV_URW_Geometric-Medium.otf'),
    geoMetricItalic: require('./assets/Fonts/GMV_URW_Geometric-Italic.otf'),
  });
};

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <LocalNotication />
      <AppNavigator />
    </Provider>
  );
}
