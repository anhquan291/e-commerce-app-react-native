import React, { useEffect } from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";

export default renderField = ({
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
          autoCapitalize={label === "Họ Tên" ? "words" : "none"}
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
        <CustomText style={{ color: "red", paddingHorizontal: 5 }}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
