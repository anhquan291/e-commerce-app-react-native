import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
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
    <View style={{ marginTop: 30 }}>
      <Input
        placeholder={label}
        autoCapitalize='none'
        clearButtonMode='always'
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
        {...restInput}
      />
      {touched &&
        ((error && (
          <CustomText style={{ color: Colors.red }}>{error}</CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: Colors.red }}>{warning}</CustomText>
          )))}
    </View>
  );
};
