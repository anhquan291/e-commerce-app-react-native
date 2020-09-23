import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
const { width } = Dimensions.get("window");

const Slide = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          resizeMode: "cover",
          width: "100%",
          height: 150,
          borderRadius: 10,
        }}
        source={imageUrl}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default Slide;
