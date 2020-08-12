import React, { useEffect } from "react";
import { StyleSheet, Image, Animated } from "react-native";
import { Easing } from "react-native-reanimated";

const Loader = (props) => {
  const spinValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });
  return (
    <Animated.Image
      style={{ ...styles.loader, transform: [{ rotate: spin }] }}
      source={require("../assets/Images/loader.png")}
    ></Animated.Image>
  );
};
const styles = StyleSheet.create({
  loader: {
    width: 50,
    height: 50,
  },
});

export default Loader;
