import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";

export class CategorySection extends React.PureComponent {
  render() {
    const { name, bg, data, navigation, user } = this.props;
    return (
      <View style={[styles.category]}>
        <Image style={styles.background} source={bg} />
        <View style={styles.titleHeader}>
          <CustomText style={styles.title}>{name}</CustomText>
        </View>
        <View style={styles.productList}>
          {data.map((item) => {
            return (
              <ProductItem
                key={item._id}
                item={item}
                navigation={navigation}
                user={user}
              />
            );
          })}
          <TouchableOpacity
            onPress={() => navigation.navigate("Product")}
            style={styles.seeMore}
          >
            <CustomText style={styles.seeMoreText}>Xem Thêm</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CategorySection.propTypes = {
  name: PropTypes.string.isRequired,
  bg: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  category: {
    height: 518,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    resizeMode: "stretch",
    borderRadius: 5,
    height: 518,
    width: "100%",
    bottom: 0,
  },
  titleHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.light_green,
    fontWeight: "500",
  },
  productList: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seeMore: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 14,
    color: Colors.lighter_green,
  },
});
