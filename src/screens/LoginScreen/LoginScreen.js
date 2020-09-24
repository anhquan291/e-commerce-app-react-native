import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
//Components
import { LoginForm } from "./components";

const { height, width } = Dimensions.get("window");

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require("../../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
