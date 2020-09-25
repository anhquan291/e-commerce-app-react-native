import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <TextInput
        placeholder={label}
        autoCapitalize={autoCapitalize ? "words" : "none"}
        clearButtonMode={passIcon ? "never" : "always"}
        mode="outlined"
        selectionColor={Colors.leave_green}
        theme={{ colors: { primary: Colors.leave_green } }}
        left={
          <TextInput.Icon
            name={icon}
            size={24}
            color={Colors.lighter_green}
            style={{ paddingRight: 10 }}
          />
        }
        style={{
          fontSize: 14,
          backgroundColor: "transparent",
          marginVertical: 5,
          // paddingHorizontal: 5,
        }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        {...restInput}
      />
      {passIcon === "pass" ? (
        <MaterialCommunityIcons
          onPress={() => {
            setShowPass((prev) => !prev);
          }}
          name={showPass ? "eye" : "eye-off"}
          size={24}
          color={Colors.lighter_green}
          style={{
            position: "absolute",
            top: "40%",
            right: 10,
            zIndex: 100,
          }}
        />
      ) : passIcon === "confirm" ? (
        <MaterialCommunityIcons
          onPress={() => {
            setshowConfirmPass((prev) => !prev);
          }}
          name={showConfirmPass ? "eye" : "eye-off"}
          size={24}
          color={Colors.lighter_green}
          style={{
            position: "absolute",
            top: "40%",
            right: 10,
            zIndex: 100,
          }}
        />
      ) : (
        <></>
      )}

      {touched && error && (
        <CustomText style={{ color: "red", marginHorizontal: 15 }}>
          {error}
        </CustomText>
      )}
    </View>
  );
};
