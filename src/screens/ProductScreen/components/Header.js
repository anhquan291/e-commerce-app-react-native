import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import SearchInput from "./SearchInput";
import ShareItem from "../../../components/UI/ShareItem";
//Color
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
//PropTypes check
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

const HEADER_HEIGHT = 250;
const HEADER_MIN = 100;
const HEADER_DISTANCE = HEADER_HEIGHT - HEADER_MIN;

export const Header = ({ navigation, searchFilterFunction, scrollY }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [HEADER_HEIGHT, HEADER_MIN],
    extrapolate: "clamp",
  });
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const titleHeight = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });
  const inputWidth = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [width, width - 60],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <View style={{ position: "absolute", left: 0, top: 40, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}
        >
          <Ionicons name="ios-arrow-back" size={22} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.shareItem}>
        <ShareItem
          imageURL="https://www.facebook.com/daquyankhangthinhvuong/"
          title="Share our facebook page"
          message="Our Facebook Link"
          color="black"
        />
      </View>
      {/* <SearchInput inputValue={searchFilterFunction} /> */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          height: titleHeight,
        }}
      >
        <CustomText style={{ fontSize: 30 }}>Tất cả sản phẩm</CustomText>
      </Animated.View>
      <Animated.View
        style={{
          width: inputWidth,
          height: 40,
          marginHorizontal: 20,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <BlurView tint="light" intensity={50} style={[{ width: "96%" }]}>
          <TextInput
            placeholder="Tìm kiếm sản phẩm"
            style={{ height: 40, marginHorizontal: 20 }}
          />
        </BlurView>
      </Animated.View>
    </Animated.View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lighter_green,
  },

  shareItem: {
    position: "absolute",
    right: 0,
    top: 40,
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
