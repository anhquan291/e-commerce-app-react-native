import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//Icon
import Colors from '../../utils/Colors';
import Loader from '../../components/Loaders/Loader';
import { useDispatch, useSelector } from 'react-redux';
//Action
import { addOrder, resetCart } from '../../reducers';
//Text
import CustomText from '../../components/UI/CustomText';
import { Header, PaymentBody } from './components';
import { SummaryOrder } from '../PreOrderScreen/components';

export const PaymentScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const carts = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.isLoading);
  const orderLoading = useSelector((state) => state.order.isLoading);
  let token = props.route.params.token;
  const [payByCard, setPayByCard] = useState(false);
  const paymentMethod = payByCard ? 'Credit Card' : 'Cash';
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1000);
    if (!unmounted.current) {
      return () => clearInterval(interval);
    }
  });
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

  //action Add Order
  const addOrderAct = async () => {
    try {
      token = payByCard ? token : {};
      await dispatch(
        addOrder(
          token,
          orderItems,
          name,
          total,
          paymentMethod,
          fullAddress,
          phone,
        ),
      );
      await dispatch(resetCart(cartId));
      props.navigation.navigate('FinishOrder');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {loading || cartLoading || orderLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <PaymentBody
              navigation={props.navigation}
              payByCard={payByCard}
              setPayByCard={setPayByCard}
              token={token}
            />
            <SummaryOrder cartItems={carts.items} total={total} />
          </ScrollView>
          <View style={styles.total}>
            <View style={styles.orderButton}>
              <TouchableOpacity onPress={addOrderAct}>
                <CustomText style={{ color: '#fff', fontSize: 16 }}>
                  Tiến hành đặt hàng
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  total: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  orderButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
});
