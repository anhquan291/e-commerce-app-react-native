import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { Ionicons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

export const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name='ios-arrow-back' size={30} color={Colors.lighter_green} />
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
