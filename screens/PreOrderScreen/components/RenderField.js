import React, { useEffect } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";

export default renderField = ({
  label,
  maxLength,
  keyboardType,
  onChangeText,
  returnKeyType,
  checkValidation,
  meta: { touched, error, warning },
  input: { ...restInput },
}) => {
  useEffect(() => {
    checkValidation(error);
  }, [onChangeText]);
  return (
    <View>
      <View>
        <TextInput
          label={label}
          mode='outlined'
          theme={{ colors: { primary: Colors.leave_green } }}
          selectionColor={Colors.leave_green}
          style={{
            marginVertical: 10,
            backgroundColor: Colors.white,
            fontSize: 14,
          }}
          maxLength={maxLength}
          autoCapitalize='words'
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
