import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//Icon
import LottieView from "lottie-react-native";
import CustomText from "../../components/UI/CustomText";
import Colors from "../../utils/Colors";

const { height } = Dimensions.get("window");

export const FinishResetPwScreen = (props) => {
  const { value } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <LottieView
          source={require("../../components/IconAnimation/mail-done.json")}
          autoPlay
          loop={false}
          resizeMode='cover'
          style={{ height: 130 }}
        />
        <CustomText style={{ marginVertical: 20 }}>
          <CustomText
            style={{
              fontSize: 16,
              color: Colors.blue,
              textDecorationLine: "underline",
            }}
            selectable={true}
          >
            {value.email}
          </CustomText>
        </CustomText>
      </View>
      <View style={styles.id}>
        <CustomText style={styles.title}>
          Vui lòng kiểm tra hòm thư của bạn.{" "}
        </CustomText>
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate("AuthScreen")}>
        <View style={styles.button}>
          <CustomText style={{ ...styles.title, color: "#fff" }}>
            LOGIN
          </CustomText>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  info: {
    marginTop: height / 4,
    alignItems: "center",
  },
  id: {
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.lighter_green,
    width: 200,
    height: 45,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
