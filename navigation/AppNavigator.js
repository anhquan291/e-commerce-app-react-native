import React, { useEffect, useState } from "react";
import { AsyncStorage, YellowBox } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { DrawerNavigator, IntroStackScreen } from "./StoneNavigator";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/auth/authActions";
//Deep Link
import { urlRedirect } from "../utils/Tools";
import * as Linking from "expo-linking";

YellowBox.ignoreWarnings(["Setting a timer"]);

const AppNavigator = () => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // listen for new url events coming from Expo
    Linking.addEventListener(
      "url",
      (event) => {
        urlRedirect(event.url);
      },
      [urlRedirect]
    );
    Linking.getInitialURL().then(urlRedirect);
  }, [urlRedirect]);

  useEffect(() => {
    const isFirstTime = async () => {
      const firstOpen = await AsyncStorage.getItem("isFirstTime");
      setValue(firstOpen);
    };
    isFirstTime();
    const autoLogout = async () => {
      const getUser = await AsyncStorage.getItem("user");
      if (getUser) {
        const user = await JSON.parse(getUser);
        if (user.data.expireTime - Date.now() < 0) {
          dispatch(AuthActions.Logout());
        }
      }
      return;
    };
    autoLogout();
  }, [dispatch]);

  const isFirstOpen = useSelector((state) => state.store.isFirstOpen);
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <IntroStackScreen /> */}
      {(isFirstOpen || value !== null) && <DrawerNavigator />}
      {!isFirstOpen && value === null && <IntroStackScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
