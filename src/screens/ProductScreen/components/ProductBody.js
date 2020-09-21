import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import HorizontalItem from "./HorizontalItem";
import { Header } from "./index";
//PropTypes check
import PropTypes from "prop-types";

export const ProductBody = ({
  navigation,
  productsFilter,
  searchFilterFunction,
}) => {
  const scrollY = new Animated.Value(0);
  const rings = productsFilter.filter((ring) => ring.type === "ring");
  const bracelets = productsFilter.filter(
    (bracelet) => bracelet.type === "bracelet"
  );
  const stones = productsFilter.filter((stone) => stone.type === "stone");

  return (
    <View style={styles.footer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header
          navigation={navigation}
          searchFilterFunction={searchFilterFunction}
          scrollY={scrollY}
        />
      </TouchableWithoutFeedback>
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarUnderlineStyle={{
          backgroundColor: Colors.light_green,
          height: 2,
        }}
        tabBarActiveTextColor={Colors.light_green}
        tabBarInactiveTextColor={Colors.grey}
        tabBarTextStyle={{
          fontSize: 15,
          paddingTop: 3,
        }}
      >
        <View tabLabel="Vòng chuỗi">
          {bracelets.length === 0 ? (
            <View style={styles.center}>
              <Text style={{ color: Colors.grey }}>
                Không tìm thấy sản phầm
              </Text>
            </View>
          ) : (
            <Animated.ScrollView
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false } //
              )}
            >
              {productsFilter.map((item) => (
                <HorizontalItem
                  key={item._id}
                  item={item}
                  navigation={navigation}
                />
              ))}
            </Animated.ScrollView>
            // <FlatList
            //   data={bracelets}
            //   keyExtractor={(item) => item._id}
            //   renderItem={({ item }) => {
            //     return <HorizontalItem item={item} navigation={navigation} />;
            //   }}
            // />
          )}
        </View>
        <View tabLabel="Nhẫn">
          {rings.length === 0 ? (
            <View style={styles.center}>
              <Text style={{ color: Colors.grey }}>
                Không tìm thấy sản phầm
              </Text>
            </View>
          ) : (
            productsFilter.map((item) => (
              <HorizontalItem
                key={item._id}
                item={item}
                navigation={navigation}
              />
            ))
          )}
        </View>
        <View tabLabel="Đá quý">
          {stones.length === 0 ? (
            <View style={styles.center}>
              <Text style={{ color: Colors.grey }}>
                Không tìm thấy sản phầm
              </Text>
            </View>
          ) : (
            productsFilter.map((item) => (
              <HorizontalItem
                key={item._id}
                item={item}
                navigation={navigation}
              />
            ))
          )}
        </View>
      </ScrollableTabView>
    </View>
  );
};

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 5,
    flex: 1,
  },
});
