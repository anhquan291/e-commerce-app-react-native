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
import renderField from "./components/ForgetRenderField";
//Colors
import Colors from "../../utils/Colors";
//Icon
import { Feather } from "@expo/vector-icons";
//Redux
import { useDispatch } from "react-redux";
//Action
import * as AuthActions from "../../store/auth/authActions";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email không được bỏ trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hơp lệ";
  }
  return errors;
};

const ForgetPwScreen = (props) => {
  const { handleSubmit, reset } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const submit = async (values) => {
    try {
      setLoading(true);
      await dispatch(AuthActions.ForgetPassword(values.email));
      setLoading(false);
      reset();
      if (!unmounted.current) {
        props.navigation.navigate("FinishResetScreen", {
          value: values,
        });
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
        style={{ position: "absolute", top: 30, left: 20 }}
      >
        <Feather
          name='arrow-left-circle'
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <CustomText style={styles.title}> Forget Password </CustomText>
        <Field
          name='email'
          keyboardType='email-address'
          icon='email'
          label='Email'
          component={renderField}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: "center" }}
        >
          <View style={styles.signIn}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={styles.textSign}>NEXT</CustomText>
            )}
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
    fontWeight: "500",
  },
});
const SignupForm = reduxForm({
  form: "contact", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ForgetPwScreen);

export default SignupForm;
