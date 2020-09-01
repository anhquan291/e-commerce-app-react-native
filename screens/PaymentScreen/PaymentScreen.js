import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
//Icon
import Colors from "../../utils/Colors";
import Loader from "../../components/Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
//Action
import * as OrderActions from "../../store/order/orderActions";
import * as CartActions from "../../store/cart/cartActions";
//Text
import CustomText from "../../components/UI/CustomText";
import Header from "./components/Header";
import PaymentBody from "./components/PaymentBody";
import SummaryOrder from "../PreOrderScreen/components/SummaryOrder";

const PaymentScreen = ({ navigation, route }) => {
  const carts = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { fullAddress, orderItems, phone, total, cartId } = route.params;
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const [loading, setLoading] = useState(false);

  //action Add Order
  const addOrder = async () => {
    try {
      setLoading(true);

      await dispatch(
        OrderActions.addOrder(orderItems, total, fullAddress, phone)
      );
      await dispatch(CartActions.resetCart(cartId));
      setLoading(false);
      if (!unmounted.current) {
        navigation.navigate("FinishOrder");
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      navigation.goBack();
    }
  }, [carts.items]);

  const PayByCard = (user, total, phone, fullAddress) => {
    fetch("http://192.168.0.27:8080/api/v1/order/post", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        total,
        phone,
        fullAddress,
      }),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <PaymentBody />
        <SummaryOrder cartItems={carts.items} total={total} />
      </ScrollView>
      <View style={styles.total}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: Colors.red,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={addOrder}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={{ color: "#fff", fontSize: 16 }}>
                Tiến hành đặt hàng
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  total: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
});

export default PaymentScreen;
