import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 15, left: 15, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <MaterialCommunityIcons
            name='menu'
            size={25}
            color={Colors.light_green}
          />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.titleHeader}>Tra cứu đơn hàng</CustomText>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    fontWeight: "500",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  titleHeader: {
    textAlign: "center",
    color: Colors.light_green,
    fontSize: 20,
  },
});
