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

const PaymentScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const carts = useSelector((state) => state.cart.cartItems);
  const error = useSelector((state) => state.order.error);
  let token = props.route.params.token;
  const [payByCard, setPayByCard] = useState(false);
  const paymentMethod = payByCard ? "Credit Card" : "Cash";

  useEffect(() => {
    setPayByCard(token ? true : false);
  }, [token]);

  const dispatch = useDispatch();
  const {
    orderItems,
    name,
    phone,
    total,
    cartId,
    fullAddress,
  } = props.route.params;
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  //action Add Order
  const addOrder = async () => {
    try {
      setLoading(true);
      token = payByCard ? token : {};
      await dispatch(
        OrderActions.addOrder(
          token,
          orderItems,
          name,
          total,
          paymentMethod,
          fullAddress,
          phone
        )
      );
      await dispatch(CartActions.resetCart(cartId));
      setLoading(false);
      if (Object.keys(error).length === 0) {
        if (!unmounted.current) {
          props.navigation.navigate("FinishOrder");
        }
      } else {
        alert(error);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.navigate("Home");
    }
  }, [carts.items]);

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <ScrollView>
        <PaymentBody
          navigation={props.navigation}
          payByCard={payByCard}
          setPayByCard={setPayByCard}
        />
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
        <View style={styles.orderButton}>
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
  orderButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default PaymentScreen;
