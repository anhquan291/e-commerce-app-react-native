import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Colors from "../../../utils/Colors";
//Icon
import LottieView from "lottie-react-native";
//PropTypes check
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export const AuthBody = ({ navigation }) => {
  return (
    <>
      <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require("../../../assets/Images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground>
      <View style={{ position: "absolute", top: 100 }}>
        <Image
          style={styles.logo}
          source={require("../../../assets/Images/logo1.png")}
        />
      </View>
      <LottieView
        source={require("../../../components/IconAnimation/welcome.json")}
        autoPlay
        loop
        resizeMode='contain'
        style={{ height: 115 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View style={styles.signinContainer}>
          <Text style={styles.text}>LOGIN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <View
          style={[
            styles.signinContainer,
            {
              backgroundColor: Colors.leave_green,
              marginTop: 15,
              borderWidth: 0,
            },
          ]}
        >
          <Text style={[styles.text, { color: "#ffffff" }]}>SIGNUP</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

AuthBody.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  signinContainer: {
    height: 60,
    width: width - 40,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.leave_green,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  logo: {
    resizeMode: "contain",
    width: 250,
    height: 100,
  },
});
