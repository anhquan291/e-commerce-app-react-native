import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
//Address
import Address from "./components/Address";
//Redux
import { useSelector } from "react-redux";
//Steps
import Header from "./components/Header";
import SummaryOrder from "./components/SummaryOrder";
import TotalButton from "./components/TotalButton";
import UserForm from "./components/UserForm";
import Loader from "../../components/Loaders/Loader";

const PreOrderScreen = (props) => {
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const carts = useSelector((state) => state.cart.cartItems);
  const { cartItems, total, cartId } = props.route.params;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const getInfo = (province, town) => {
    setProvince(province);
    setTown(town);
  };
  const getReceiver = (name, phone, address) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
  };
  const checkValidation = (error) => {
    setError(error);
  };
  let orderItems = [];
  cartItems.map((item) => {
    orderItems.push({ item: item.item._id, quantity: item.quantity });
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1000);
    if (!unmounted.current) {
      return () => clearInterval(interval);
    }
  });
  const fullAddress = `${address}, ${town} ,${province}`;
  const toPayment = async () => {
    // try {
    //   if (error == undefined && province.length !== 0 && town.length !== 0) {
    //     props.navigation.navigate("Payment", {
    //       screen: "PaymentScreen",
    //       params: {
    //         fullAddress,
    //         orderItems,
    //         name,
    //         phone,
    //         total,
    //         cartId,
    //         carts,
    //       },
    //     });
    //   } else {
    //     alert("Vui lòng nhập đầy đủ thông tin.");
    //   }
    // } catch (err) {
    //   throw err;
    // }
    props.navigation.navigate("Payment", {
      screen: "PaymentScreen",
      params: {
        fullAddress,
        orderItems,
        name,
        phone,
        total,
        cartId,
        carts,
      },
    });
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items]);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <UserForm
              getReceiver={getReceiver}
              checkValidation={checkValidation}
            />
            <Address getInfo={getInfo} />
            <SummaryOrder cartItems={cartItems} total={total} />
          </ScrollView>
          <TotalButton toPayment={toPayment} />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default PreOrderScreen;
