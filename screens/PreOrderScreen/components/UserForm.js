import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { Field, reduxForm } from "redux-form";
//Colors
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";

//Validation

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Họ tên không được bỏ trống";
  } else if (values.name.length < 6) {
    errors.name = "Họ tên phải nhiều hơn hoặc bằng 6 ký tự";
  } else {
    errors.name = "";
  }
  if (!values.phone) {
    errors.phone = "Số điện thoại không được bỏ trống";
  } else if (values.phone.length !== 10) {
    errors.phone = "Số điện thoại phải 10 ký tự";
  } else {
    errors.phone = "";
  }
  if (!values.address) {
    errors.address = "Địa chỉ không được bỏ trống";
  } else if (values.address.length < 6) {
    errors.address = "Địa chỉ phải nhiều hơn hoặc bằng 6 ký tự";
  } else {
    errors.address = "";
  }

  return errors;
};

const renderField = ({
  label,
  keyboardType,
  onChangeText,
  returnKeyType,
  checkFocus,
  checkValidation,
  meta: { touched, error, warning },
  input: { ...restInput },
}) => {
  useEffect(() => {
    checkValidation(error);
  }, [checkFocus]);
  return (
    <View>
      <View>
        <Input
          placeholder={label}
          autoCapitalize={label === "name" ? "words" : "none"}
          inputStyle={{ fontSize: 14 }}
          inputContainerStyle={{
            borderBottomColor: checkFocus ? Colors.lighter_green : Colors.grey,
            borderBottomWidth: checkFocus ? 1.5 : 1,
          }}
          returnKeyType={returnKeyType ? returnKeyType : "next"}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          {...restInput}
        />
      </View>

      {touched && error && (
        <CustomText
          style={{ color: "red", marginBottom: 5, paddingHorizontal: 5 }}
        >
          {error}
        </CustomText>
      )}
    </View>
  );
};

const User = ({ getReceiver, checkValidation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [colorName, setColorName] = useState(false);
  const [colorAddress, setColorAddress] = useState(false);
  const [colorPhone, setColorPhone] = useState(false);

  useEffect(() => {
    getReceiver(name, phone, address);
  }, [colorName, colorAddress, colorPhone]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Thông Tin Giao Hàng</CustomText>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Field
            name="name"
            label="Họ Tên"
            keyboardType="default"
            component={renderField}
            onChangeText={(value) => setName(value)}
            checkFocus={colorName}
            onFocus={() => setColorName(true)}
            onBlur={() => setColorName(false)}
            checkValidation={checkValidation}
          />

          <Field
            name="phone"
            label="Số điện thoại"
            component={renderField}
            onChangeText={(value) => setPhone(value)}
            keyboardType="numeric"
            returnKeyType="done"
            checkFocus={colorPhone}
            onFocus={() => setColorPhone(true)}
            onBlur={() => setColorPhone(false)}
            checkValidation={checkValidation}
          />

          <Field
            name="address"
            label="Địa chỉ"
            component={renderField}
            onChangeText={(value) => setAddress(value)}
            keyboardType="default"
            checkFocus={colorAddress}
            onFocus={() => setColorAddress(true)}
            onBlur={() => setColorAddress(false)}
            checkValidation={checkValidation}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputContainer: {
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
const UserForm = reduxForm({
  form: "user", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(User);
export default UserForm;
