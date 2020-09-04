import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { Input } from "react-native-elements";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//Redux
import { useDispatch } from "react-redux";
//Action
import * as AuthActions from "../../../store/auth/authActions";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email không được bỏ trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hơp lệ";
  }
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
  if (!values.username) {
    errors.username = "Tên không được bỏ trống";
  } else if (values.username.length > 20) {
    errors.username = "Tên không vượt quá 20 ký tự";
  }

  return errors;
};

const renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  setShowPass,
  showConfirmPass,
  setshowConfirmPass,
  autoCapitalize,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <Input
        placeholder={label}
        autoCapitalize={autoCapitalize ? "words" : "none"}
        clearButtonMode={passIcon ? "never" : "always"}
        leftIcon={
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={Colors.lighter_green}
          />
        }
        rightIcon={
          passIcon === "pass" ? (
            <TouchableOpacity
              onPress={() => {
                setShowPass((prev) => !prev);
              }}
            >
              <MaterialCommunityIcons
                name={showPass ? "eye" : "eye-off"}
                size={24}
                color={Colors.lighter_green}
              />
            </TouchableOpacity>
          ) : passIcon === "confirm" ? (
            <TouchableOpacity
              onPress={() => {
                setshowConfirmPass((prev) => !prev);
              }}
            >
              <MaterialCommunityIcons
                name={showConfirmPass ? "eye" : "eye-off"}
                size={24}
                color={Colors.lighter_green}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        inputStyle={{ fontSize: 14 }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        {...restInput}
      />

      {touched && error && (
        <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
      )}
    </View>
  );
};

const Signup = (props) => {
  const { handleSubmit, reset } = props;
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const dispatch = useDispatch();
  const submit = async (values) => {
    setLoading(true);
    try {
      await dispatch(
        AuthActions.SignUp(values.username, values.email, values.password)
      );
      setLoading(false);
      reset();
      if (!unmounted.current) {
        alert("Sign Up Successfully");
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 20,
            }}
          >
            <View>
              <Field
                name="username"
                keyboardType="default"
                label="Your Name"
                component={renderField}
                icon="id-card"
                autoCapitalize={true}
              />
              <Field
                name="email"
                keyboardType="email-address"
                label="Email"
                icon="email"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Password"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="pass"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
              <Field
                name="confirmpassword"
                keyboardType="default"
                label="Confirm Password"
                component={renderField}
                secureTextEntry={showConfirmPass ? false : true}
                passIcon="confirm"
                icon="lock"
                showConfirmPass={showConfirmPass}
                setshowConfirmPass={setshowConfirmPass}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: "center" }}
            >
              <View style={styles.signIn}>
                <CustomText style={styles.textSign}>
                  {loading ? (
                    <ActivityIndicator
                      style={{ paddingTop: 10 }}
                      size="small"
                      color="#fff"
                    />
                  ) : (
                    "REGISTER"
                  )}
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green,
    marginTop: 20,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: "center",
  },
});
const SignupForm = reduxForm({
  form: "contact", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Signup);

export default SignupForm;
