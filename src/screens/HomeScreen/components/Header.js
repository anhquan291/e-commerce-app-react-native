// Import react
import React from "react";
// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
//icon
import { Ionicons } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
//Search Item component
import SearchItem from "./SearchItem";
import Animated, { Easing } from "react-native-reanimated";
const { Value, timing } = Animated;
// Calculate window size
const { width, height } = Dimensions.get("window");

export class Header extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      isFocused: false,
      keyword: "",
      productsFilter: "",
    };
    // animation values
    this._input_box_translate_x = new Value(width);
    this._back_button_opacity = new Value(0);
    this._content_translate_y = new Value(height);
    this._content_opacity = new Value(0);
  }
  //Search
  searchFilterFunction = (searchText) => {
    const data = this.props.products.filter((product) =>
      product.filename.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ keyword: searchText, productsFilter: data });
  };

  _onFocus = () => {
    // update state
    this.setState({ isFocused: true });
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();
    // force focus
    this.refs.input.focus();
  };
  _onBlur = () => {
    // update state
    this.setState({ isFocused: false });
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 50,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();
    // force blur
    this.refs.input.blur();
  };

  render() {
    const scrollY = this.props.scrollPoint;
    const headerPlatform = 50;
    const _diff_clamp_scroll_y = Animated.diffClamp(scrollY, 0, headerPlatform);
    const _header_height = Animated.interpolate(_diff_clamp_scroll_y, {
      inputRange: [0, headerPlatform],
      outputRange: [headerPlatform, 0],
      extrapolate: "clamp",
    });
    const _header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
      inputRange: [0, headerPlatform],
      outputRange: [0, -headerPlatform],
      extrapolate: "clamp",
    });
    const _header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
      inputRange: [0, headerPlatform],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    // const ViewPlatForm = Platform.OS === "android" ? SafeAreaView : View;
    return (
      <>
        <SafeAreaView
          style={{ ...styles.header_safe_area, ...this.props.style }}
        >
          <Animated.View
            style={[
              styles.header,
              {
                height: Platform.OS === "ios" ? _header_height : 50,
                transform: [
                  {
                    translateY: Platform.OS === "ios" ? _header_translate_y : 0,
                  },
                ],
                opacity: Platform.OS === "ios" ? _header_opacity : 1,
              },
            ]}
          >
            <View style={styles.header_inner}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Ionicons
                  name='ios-menu'
                  size={30}
                  color={Colors.lighter_green}
                />
              </TouchableOpacity>
              <View>
                <Image
                  source={require("../../../assets/Images/logoNoText.png")}
                  style={{
                    width: height < 668 ? 130 : 120,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Ionicons name='ios-search' size={20} color='#fff' />
              </TouchableHighlight>
              <Animated.View
                style={[
                  styles.input_box,
                  { transform: [{ translateX: this._input_box_translate_x }] },
                ]}
              >
                <Animated.View style={{ opacity: this._back_button_opacity }}>
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"#ccd0d5"}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Ionicons
                      name='ios-arrow-back'
                      size={25}
                      color={Colors.light_green}
                    />
                  </TouchableHighlight>
                </Animated.View>
                <TextInput
                  ref='input'
                  placeholder='Tìm kiếm sản phẩm'
                  clearButtonMode='always'
                  value={this.state.keyword}
                  onChangeText={(value) => this.searchFilterFunction(value)}
                  style={styles.input}
                />
              </Animated.View>
            </View>
          </Animated.View>
        </SafeAreaView>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: this._content_opacity,
              transform: [{ translateY: this._content_translate_y }],
            },
          ]}
        >
          <View style={styles.content_safe_area}>
            {this.state.keyword === "" ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  source={require("../../../assets/Images/logo1.png")}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Nhập vào từ khóa{"\n"}
                  để tìm kiếm :D
                </Text>
              </View>
            ) : (
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop:
                    Platform.OS === "android" ? 0 : height < 668 ? 0 : 60,
                }}
              >
                {this.state.productsFilter.length === 0 ? (
                  <Text style={styles.image_placeholder_text}>
                    Không tìm thấy sản phầm
                  </Text>
                ) : (
                  <FlatList
                    data={this.state.productsFilter}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                      return (
                        <SearchItem
                          item={item}
                          navigation={this.props.navigation}
                        />
                      );
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </Animated.View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
  },
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: Colors.lighter_green,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    width: width,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    width: width,
    height: height,
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 150,
  },
  content_inner: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
  image_placeholder_container: {
    flexDirection: "column",
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  image_placeholder_text: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
  },
  search_item: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e4eb",
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});
