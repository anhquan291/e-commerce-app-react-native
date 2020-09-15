import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Item
import ItemList from "../../PreOrderScreen/components/PreOrderItem";
//Number format
import NumberFormat from "../../../components/UI/NumberFormat";
//Moment
import moment from "moment";
import "moment/min/locales";
//PropTypes check
import PropTypes from "prop-types";
import CustomText from "../../../components/UI/CustomText";
import Steps from "../../../components/UI/Steps";

moment.locale("vi");

export const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const status = () => {
    switch (order.status) {
      case "waiting":
        return 0;
      case "confirmed":
        return 1;
      case "delivery":
        return 2;
      default:
        return 3;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Mã đơn: </CustomText>
          <CustomText style={styles.detail}>
            CT-{order._id.substr(order._id.length - 10)}
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Ngày đặt: </CustomText>
          <CustomText style={styles.detail}>
            {moment(order.date).format("Do MMMM  YYYY, hh:mm a ")}
          </CustomText>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <CustomText style={{ fontSize: 15, color: "#fff" }}>
              {showDetails ? "Ẩn đơn hàng" : "Chi tiết đơn hàng"}
            </CustomText>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Tên người nhận: </CustomText>
              <CustomText style={styles.detail}>{order.name}</CustomText>
            </View>

            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Địa chỉ: </CustomText>
              <CustomText style={styles.detail}>{order.address}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>Số điện thoại: </CustomText>
              <CustomText style={styles.detail}>{order.phone}</CustomText>
            </View>
            <View style={styles.textContainer}>
              <CustomText style={styles.text}>
                Phương thức thanh toán:{" "}
              </CustomText>
              <CustomText style={styles.detail}>
                {order.paymentMethod}
              </CustomText>
            </View>
            <View style={styles.steps}>
              <Steps position={status()} />
            </View>

            <CustomText style={styles.text}>Sản phẩm đã đặt:</CustomText>
            <FlatList
              data={order.items}
              keyExtractor={(item) => item.item._id}
              renderItem={({ item }) => {
                return <ItemList item={item} />;
              }}
            />
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              <CustomText style={styles.text}>Tổng tiền:</CustomText>
              <NumberFormat
                price={order.totalAmount.toString()}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.lighter_green,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  detail: {
    color: Colors.lighter_green,
  },
  steps: {
    width: "100%",
    height: 100,
  },
});

export default OrderItem;
