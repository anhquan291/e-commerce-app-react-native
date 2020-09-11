import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import Colors from "../../utils/Colors";
//Components
import SignupForm from "./components/SignupForm";
//Icon
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const SignUpScreen = ({ navigation }) => {
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
        style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}
      >
        <Ionicons name='ios-arrow-back' size={35} color={Colors.light_green} />
      </TouchableOpacity>

      <View style={styles.header}></View>
      <SignupForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent: "center",
    // justifyContent: "center",
  },
  header: {
    marginTop: height * 0.15,
    width: width,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
});

export default SignUpScreen;
