import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import CustomText from "../../components/UI/CustomText";
import renderField from "./components/ResetRenderFileld";
//Colors
import Colors from "../../utils/Colors";
//Icon
import { Feather } from "@expo/vector-icons";
//Redux
import { useDispatch, useSelector } from "react-redux";
// Action
import { ResetPassword } from "../../reducers";
import Loader from "../../components/Loaders/Loader";
import * as SecureStore from "expo-secure-store";

//Validation
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Mật khẩu không được bỏ trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }
  if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Mật khẩu xác nhận không trùng khớp";
  }

  return errors;
};

const resetForm = (props) => {
  const { handleSubmit, reset } = props;
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const loading = useSelector((state) => state.auth.isLoading);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const url = props.route.params;
  const submit = async (values) => {
    try {
      await dispatch(ResetPassword(values.password, url));
      await SecureStore.deleteItemAsync(secretKey);
      Keyboard.dismiss;
      await reset();
      Alert.alert("Reset Successfully", "You can login now", [
        {
          text: "Okay",
          onPress: () => {
            props.navigation.navigate("Home");
          },
        },
      ]);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loader /> : <></>}
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Feather
          name="arrow-left-circle"
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <CustomText style={styles.title}> Reset Password </CustomText>
        <Field
          name="password"
          keyboardType="default"
          label="Mật Khẩu"
          component={renderField}
          secureTextEntry={!showPass ? true : false}
          placeholder="Mật khẩu của bạn"
          icon="lock-outline"
          passIcon="pass"
          showPass={showPass}
          setShowPass={setShowPass}
        />
        <Field
          name="confirmpassword"
          keyboardType="default"
          label="Xác Nhận Mật Khẩu"
          component={renderField}
          secureTextEntry={!showConfirmPass ? true : false}
          placeholder="Xác nhận mật khẩu"
          passIcon="confirm"
          icon="lock-outline"
          showConfirmPass={showConfirmPass}
          setshowConfirmPass={setshowConfirmPass}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: "center" }}
        >
          <View style={styles.signIn}>
            <CustomText style={styles.textSign}>Reset Your Password</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: "20%",
    height: 300,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.lighter_green,
    fontSize: 30,
    marginBottom: 10,
  },
  signIn: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
  },
});
export const ResetPwScreen = reduxForm({
  form: "resetPw", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(resetForm);
