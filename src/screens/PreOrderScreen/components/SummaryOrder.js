import React from "react";
import { View, StyleSheet } from "react-native";
//Number
import NumberFormat from "../../../components/UI/NumberFormat";
//PreOrderItem
import PreOrderItem from "./PreOrderItem";
//Text
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";

export class SummaryOrder extends React.PureComponent {
  render() {
    const { cartItems, total } = this.props;
    return (
      <View style={styles.container}>
        <CustomText style={{ ...styles.title, marginVertical: 5 }}>
          Tóm tắt đơn hàng
        </CustomText>
        <View style={{ backgroundColor: "#fff", paddingHorizontal: 10 }}>
          {cartItems.map((item) => {
            return (
              <View key={item.item.createdAt}>
                <PreOrderItem item={item} />
              </View>
            );
          })}
        </View>
        <View style={styles.total}>
          <CustomText
            style={{
              fontSize: 15,
              color: Colors.text,
              fontWeight: "500",
            }}
          >
            Thành tiền
          </CustomText>
          <NumberFormat price={total.toString()} />
        </View>
      </View>
    );
  }
}

SummaryOrder.propTypes = {
  cartItems: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 65,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
