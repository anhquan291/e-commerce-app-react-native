import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
//Icon
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

//PreOrderItem
import PreOrderItem from '../PreOrderScreen/components/PreOrderItem';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as OrderActions from '../../store/order/orderActions';
import * as CartActions from '../../store/cart/cartActions';
//Number
import NumberFormat from '../../components/UI/NumberFormat';
//Text
import CustomText from '../../components/UI/CustomText';
//Steps
import OrderSteps from '../../components/UI/OrderSteps';

const { height, width } = Dimensions.get('window');

const PaymentScreen = (props) => {
  const carts = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { fullAddress, orderItems, phone, total, cartId } = props.route.params;
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
      if (
        name.length < 6 ||
        phone.length != 10 ||
        address.length < 5 ||
        province.length < 5 ||
        town.length < 5
      ) {
        Alert.alert(
          'Thông tin không hợp lệ',
          'Bạn vui lòng nhập đẩy đủ thông tin',
          [{ text: 'Nhập lại' }],
          { cancelable: false }
        );
        setLoading(false);
      } else {
        await dispatch(
          OrderActions.addOrder(orderItems, total, fullAddress, phone)
        );
        await dispatch(CartActions.resetCart(cartId));
        setLoading(false);
        if (!unmounted.current) {
          props.navigation.navigate('FinishOrder');
        }
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'absolute', bottom: 5, left: 15, zIndex: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginBottom: 10 }}
              name='md-arrow-back'
              size={25}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.orderStepsContainer}>
          <CustomText style={styles.title}> Phương Thức Thanh Toán </CustomText>
          <View style={styles.orderSteps}>
            <OrderSteps position={2} />
          </View>
        </View>

        <View />
      </View>
      <View style={styles.total}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <CustomText style={{ fontSize: 15, color: Colors.text }}>
            Thành tiền
          </CustomText>
          <NumberFormat price={total.toString()} />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: Colors.red,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={addOrder}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={{ color: '#fff', fontSize: 16 }}>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    width: width,
    backgroundColor: Colors.lighter_green,
    height: 100,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  total: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  orderStepsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});

export default PaymentScreen;
