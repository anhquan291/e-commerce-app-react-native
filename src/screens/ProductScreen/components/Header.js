import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
// import SearchInput from "./SearchInput";
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
const FIXHEIGHT = Platform.OS === "ios" ? HEADER_DISTANCE : HEADER_DISTANCE * 3;

export const Header = ({ navigation, searchFilterFunction, scrollY }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, FIXHEIGHT],
    outputRange: [HEADER_HEIGHT, HEADER_MIN],
    extrapolate: "clamp",
  });
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, FIXHEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const borderWidth = scrollY.interpolate({
    inputRange: [0, FIXHEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const titleHeight = scrollY.interpolate({
    inputRange: [0, FIXHEIGHT],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });
  const inputWidth = scrollY.interpolate({
    inputRange: [0, FIXHEIGHT],
    outputRange: [width, width - 80],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: headerHeight,
          borderBottomWidth: borderWidth,
          borderColor: Colors.light_grey,
        },
      ]}
    >
      <View style={{ position: "absolute", left: 0, top: 40, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}
        >
          <Ionicons name='ios-arrow-back' size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.shareItem}>
        <ShareItem
          imageURL='https://www.facebook.com/daquyankhangthinhvuong/'
          title='Share our facebook page'
          message='Our Facebook Link'
          color='black'
        />
      </View>
      {/* <SearchInput inputValue={searchFilterFunction} /> */}
      <Animated.View
        style={{
          opacity: titleOpacity,
          height: titleHeight,
        }}
      >
        <CustomText style={styles.title}>Tất cả sản phẩm</CustomText>
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
        <BlurView
          tint='dark'
          intensity={20}
          style={[{ width: "96%", borderRadius: 5 }]}
        >
          <TextInput
            placeholder='Tìm kiếm sản phẩm'
            placeholderTextColor={Colors.white}
            clearButtonMode='always'
            onChangeText={(text) => searchFilterFunction(text)}
            style={{ height: 40, marginHorizontal: 20, color: Colors.white }}
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
    // backgroundColor: Colors.lighter_green,
  },
  title: {
    fontSize: 30,
    color: Colors.white,
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
