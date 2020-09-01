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
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <View>
        <Input
          placeholder={label}
          autoCapitalize="none"
          clearButtonMode={passIcon ? "never" : "always"}
          leftIcon={
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={Colors.lighter_green}
            />
          }
          rightIcon={
            passIcon ? (
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
      </View>
      {touched && error && (
        <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
      )}
    </View>
  );
};

const Login = (props) => {
  const { handleSubmit, reset } = props;
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
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
      await dispatch(AuthActions.Login(values.email, values.password));
      reset();
      if (!unmounted.current) {
        setLoading(false);
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
                passIcon="eye"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ForgetPwScreen");
                }}
              >
                <CustomText
                  style={{ ...styles.textSignSmall, fontWeight: "600" }}
                >
                  Forget Password ?
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: "center" }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>ĐĂNG NHẬP</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green,
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
const LoginForm = reduxForm({
  form: "contact", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Login);

export default LoginForm;
