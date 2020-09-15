import React from "react";
import { View, StyleSheet } from "react-native";
import { AuthBody } from "./components";

export const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AuthBody navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
