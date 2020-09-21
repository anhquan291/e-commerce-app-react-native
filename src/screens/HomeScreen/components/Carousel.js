import React, { useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import banners from "../../../db/Banners";
import Slide from "./Slide";
import Pagination from "./Pagination";
const { width } = Dimensions.get("window");

export const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate='fast'
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } //
        )}
      >
        {banners.map((slide) => {
          return <Slide key={slide.id} imageUrl={slide.imageUrl} />;
        })}
      </Animated.ScrollView>
      <Pagination slides={banners} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
