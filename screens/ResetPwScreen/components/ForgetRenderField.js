import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomText from "../../../components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";

export default renderField = ({
  keyboardType,
  icon,
  label,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <TextInput
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
        inputStyle={{ fontSize: 14, paddingLeft: 10 }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        {...restInput}
      />
      {touched &&
        ((error && (
          <CustomText style={{ color: "CustomText" }}>{error}</CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: "orange" }}>{warning}</CustomText>
          )))}
    </View>
  );
};
