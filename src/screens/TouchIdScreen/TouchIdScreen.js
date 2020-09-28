import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { AuthBody, Header } from "./components";

export const TouchIdScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <AuthBody />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
