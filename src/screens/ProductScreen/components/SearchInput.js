import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Color
import Colors from "../../../utils/Colors";
//Animate
import Animated, { Easing } from "react-native-reanimated";
//height
const { height } = Dimensions.get("window");

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      keyword: "",
      productsFilter: "",
    };
    this.titleHeight = new Animated.Value(40);
    this.titleopacity = new Animated.Value(1);
  }
  _onFocus = () => {
    Animated.timing(this.titleHeight, {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start();
    Animated.timing(this.titleopacity, {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };
  _onBlur = () => {
    Animated.timing(this.titleHeight, {
      duration: 300,
      toValue: 40,
      easing: Easing.inOut(Easing.ease),
    }).start();
    Animated.timing(this.titleopacity, {
      duration: 300,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };
  _textChangeHandler = (text) => {
    this.props.inputValue(text);
  };
  render() {
    return (
      <View>
        <Animated.View
          style={[
            styles.title,
            { height: this.titleHeight, opacity: this.titleOpacity },
          ]}
        >
          <Text style={styles.titleText}>Tất cả sản phẩm</Text>
        </Animated.View>
        <View style={styles.inputBox}>
          <Ionicons name='ios-search' size={20} color={Colors.text} />
          <TextInput
            placeholder='Nhập tên sản phẩm'
            clearButtonMode='always'
            style={styles.input}
            onChangeText={(text) => this._textChangeHandler(text)}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    marginTop: Platform.OS === "android" ? 90 : height < 668 ? 90 : 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: Platform.OS === "android" ? 30 : height < 668 ? 30 : 32,
    color: Colors.lighter_green,
  },
  inputBox: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    backgroundColor: Colors.light_grey,
    borderRadius: 15,
  },
  input: {
    marginLeft: 10,
    borderWidth: 0,
    fontSize: 16,
    width: "97%",
  },
});
