import React from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../utils/Colors";

const { width, height } = Dimensions.get("window");

const Loader = () => {
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width,
        height,
        backgroundColor: "rgba(128, 129, 130,0.5)",
        zIndex: 1001,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size='large' color={Colors.lighter_green} />
    </View>
  );
};

export default Loader;
