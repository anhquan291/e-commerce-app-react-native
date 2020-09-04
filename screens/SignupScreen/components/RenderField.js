import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";

export default renderField = ({
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
        inputStyle={{ fontSize: 14, paddingLeft: 10 }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        {...restInput}
      />

      {touched && error && (
        <CustomText style={{ color: "red", marginHorizontal: 15 }}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
