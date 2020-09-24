import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { Ionicons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

export const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="ios-arrow-back"
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
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
