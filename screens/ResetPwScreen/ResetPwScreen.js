import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Field, reduxForm } from "redux-form";
import CustomText from "../../components/UI/CustomText";
import renderField from "./components/ResetRenderFileld";
//Colors
import Colors from "../../utils/Colors";
//Icon
import { Feather } from "@expo/vector-icons";
//Redux
import { useDispatch } from "react-redux";
//Import Action
import * as AuthActions from "../../store/auth/authActions";
import Snackbar from "../../components/Notification/Snackbar";

//Validation
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Mật khẩu không được bỏ trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "Mật khẩu không được bỏ trống";
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Mật khẩu xác nhận không trùng khớp";
  }

  return errors;
};

const ResetPwScreen = (props) => {
  const { handleSubmit, reset } = props;
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const [showSnack, setSnowSnack] = useState(false);
  const url = props.route.params;
  const dispatch = useDispatch();
  const submit = async (values) => {
    setLoading(true);
    try {
      await dispatch(AuthActions(values.password, url));
      await setLoading(false);
      reset();

      if (!unmounted.current) {
        setSnowSnack(true);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={styles.textSign}>Đặt Lại Mật Khẩu</CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Snackbar
        checkVisible={showSnack}
        message={"Reset password successfully"}
      />
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
const SignupForm = reduxForm({
  form: "resetPw", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ResetPwScreen);

export default SignupForm;
