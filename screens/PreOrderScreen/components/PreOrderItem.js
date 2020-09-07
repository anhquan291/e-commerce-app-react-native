import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import NumberFormat from "react-number-format";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";

class PreOrderItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    const total = +item.quantity * +item.item.price;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            style={{
              width: "100%",
              height: 50,
              resizeMode: "stretch",
              borderRadius: 5,
            }}
            source={{ uri: item.item.thumb }}
          />
        </View>
        <View style={styles.right}>
          <View>
            <CustomText style={styles.title}>{item.item.filename}</CustomText>
          </View>
          <NumberFormat
            value={total.toString()}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
            renderText={(formattedValue) => (
              <View style={styles.priceContainer}>
                <CustomText style={{ fontSize: 13, padding: 0 }}>
                  SL: x {item.quantity}
                </CustomText>
                <CustomText style={styles.price}>{formattedValue}</CustomText>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

PreOrderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
  },
  left: {
    width: "20%",
    height: "100%",
    alignItems: "center",
  },
  right: {
    width: "80%",
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 13,
    color: Colors.red,
  },
});

export default PreOrderItem;
