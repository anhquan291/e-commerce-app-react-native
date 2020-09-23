import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm, reset } from "redux-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { Login as LoginAction } from "../../../reducers";
//PropTypes check
import PropTypes from "prop-types";
import renderField from "./RenderField";

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

const Login = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const submit = async (values) => {
    try {
      await dispatch(LoginAction(values.email, values.password));
      props.navigation.navigate("Home");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 10,
              zIndex: -1,
            }}
          >
            <View>
              <Field
                name='email'
                keyboardType='email-address'
                label='Email'
                icon='email'
                component={renderField}
              />
              <Field
                name='password'
                keyboardType='default'
                label='Password'
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon='eye'
                icon='lock'
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
                  style={{
                    ...styles.textSignSmall,
                    fontFamily: "Roboto-Medium",
                  }}
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
                {auth.isLoading ? (
                  <ActivityIndicator size='small' color='#fff' />
                ) : (
                  <CustomText style={styles.textSign}>Đăng nhập</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
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
    fontFamily: "Roboto-Medium",
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: "center",
  },
});
export const LoginForm = reduxForm({
  form: "login", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Login);
