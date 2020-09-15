import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SearchInput from "./SearchInput";
import ShareItem from "../../../components/UI/ShareItem";
//Color
import Colors from "../../../utils/Colors";
//icon
import { Ionicons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

export const Header = ({ navigation, searchFilterFunction }) => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", left: 0, top: 40, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}
        >
          <Ionicons name='ios-arrow-back' size={20} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.shareItem}>
        <ShareItem
          imageURL='https://www.facebook.com/daquyankhangthinhvuong/'
          title='Share our facebook page'
          message='Our Facebook Link'
        />
      </View>
      <SearchInput inputValue={searchFilterFunction} />
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
  },

  shareItem: {
    position: "absolute",
    right: 0,
    top: 40,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
