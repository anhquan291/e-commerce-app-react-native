import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import Colors from "../../utils/Colors";
//Components
import { LoginForm } from "./components";
//Icon
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require("../../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Ionicons name='ios-arrow-back' size={35} color={Colors.light_green} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>LOGIN</Text>
        </View>
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 40,
    marginHorizontal: 20,
    zIndex: 1,
  },

  title: {
    color: Colors.light_green,
    fontSize: 40,
    letterSpacing: 5,
    fontFamily: "Roboto-Bold",
  },
  text: {
    color: "#fff",
  },
});
