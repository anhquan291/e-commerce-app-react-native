import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
//Text
import CustomText from "../../../components/UI/CustomText";
//Icon
import { Ionicons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";

const { height } = Dimensions.get("window");

export const Header = ({ navigation, user, carts }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name='ios-arrow-back'
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
      <CustomText style={styles.titleHeader}>
        Giỏ Hàng{" "}
        {Object.keys(user).length === 0
          ? ""
          : carts.items.length === 0
          ? ""
          : `(${carts.items.length})`}
      </CustomText>
      <View style={{ width: 15 }} />
    </View>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  titleHeader: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium",
  },
});
