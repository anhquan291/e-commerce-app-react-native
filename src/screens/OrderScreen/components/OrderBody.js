import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import Messages from "../../../messages/user";
import OrderItem from "./OrderItem";
//PropTypes check
import PropTypes from "prop-types";

export class OrderBody extends React.PureComponent {
  render() {
    const { navigation, user, orders, loadOrders, isRefreshing } = this.props;
    return (
      <View style={styles.footer}>
        {Object.keys(user).length === 0 ? (
          <View style={styles.center}>
            <CustomText style={{ fontSize: 16 }}>
              {Messages["user.login.require"]}
            </CustomText>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <CustomText style={{ fontSize: 16, color: "#fff" }}>
                  Tiếp tục
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.center}>
            <CustomText style={{ fontSize: 16 }}>
              Bạn không có đơn hàng nào!
            </CustomText>
          </View>
        ) : (
          <FlatList
            data={orders}
            onRefresh={loadOrders}
            refreshing={isRefreshing}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        )}
      </View>
    );
  }
}

OrderBody.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  loadOrders: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    marginVertical: 10,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
});
