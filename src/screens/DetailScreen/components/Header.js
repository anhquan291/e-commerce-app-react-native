import React, { useState } from "react";
import {
  View,
  Animated,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Animatable
import * as Animatable from "react-native-animatable";
import ShareItem from "../../../components/UI/ShareItem";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";

const { height } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT =
  Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header = ({ navigation, scrollY, item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
  return (
    <Animatable.View delay={500} animation="fadeInDown">
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.goBackIcon}
        >
          <View>
            <Ionicons name="ios-arrow-back" size={25} color="#fff" />
          </View>
        </TouchableOpacity>
        <Animated.View style={{ opacity: headerOpacity }}>
          <CustomText
            style={{ fontSize: 16, color: "#fff", fontWeight: "500" }}
          >
            {item.filename}
          </CustomText>
        </Animated.View>
        <View style={styles.shareIcon}>
          <ShareItem
            imageURL={item.url}
            title={item.filename}
            message={item.filename}
          />
        </View>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors.lighter_green,
          overflow: "hidden",
          opacity: headerOpacity,
          height: HEADER_MAX_HEIGHT,
          transform: [{ translateY: headerTranslate }],
        }}
      ></Animated.View>
      <Animated.Image
        source={{ uri: item.url }}
        style={[
          styles.image,
          {
            opacity: imageOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <ActivityIndicator size="small" color={Colors.grey} />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Platform.OS === "android" ? 15 : 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_MIN_HEIGHT,
    zIndex: 1000,
  },
  goBackIcon: {
    width: 40,
  },
  shareIcon: {
    width: 40,
    alignItems: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "stretch",
  },
});
