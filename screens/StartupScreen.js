import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

const StartupScreen = () => {
  useEffect(() => {
    const FirstTime = async () => {
      try {
        const isF = await AsyncStorage.getItem('isFirstTime');
        if (!userData) {
          // props.navigation.navigate('Auth');
          dispatch(authActions.setDidTryAL());
          return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          // props.navigation.navigate('Auth');
          dispatch(authActions.setDidTryAL());
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();

        // props.navigation.navigate('Shop');
        dispatch(authActions.authenticate(userId, token, expirationTime));
      } catch (err) {
        throw err;
      }
    };

    FirstTime();
  }, []);
  return <View></View>;
};

export default StartupScreen;
