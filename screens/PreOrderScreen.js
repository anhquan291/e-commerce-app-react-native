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
import Colors from '../constants/Colors';
//Address
import Address from '../components/UI/Address';
//PreOrderItem
import PreOrderItem from '../components/Product/PreOrderItem';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as OrderActions from '../store/order/orderActions';
import * as CartActions from '../store/cart/cartActions';
//Number
import NumberFormat from '../components/UI/NumberFormat';
//Text
import TextGeo from '../components/UI/TextGeo';

const { height } = Dimensions.get('window');

const PreOrderScreen = (props) => {
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const carts = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);
  const { cartItems } = props.route.params;
  const { total } = props.route.params;
  const { cartId } = props.route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [town, setTown] = useState('');
  const getInfor = (name, phone, address, province, town) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
    setProvince(province);
    setTown(town);
  };
  let orderItems = [];
  cartItems.map((item) => {
    orderItems.push({ item: item.item._id, quantity: item.quantity });
  });

  const fullAddress = `${address}, ${town} ,${province}`;
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
          OrderActions.addOrder(orderItems, total, fullAddress, parseInt(phone))
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
        <TextGeo style={styles.title}> Tiến Hành Đặt Hàng </TextGeo>
        <View />
      </View>
      <Address getInfor={getInfor}>
        {cartItems.map((item) => {
          return (
            <View key={item.item._id}>
              <PreOrderItem item={item} />
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            marginBottom: 65,
            marginTop: 10,
            paddingRight: 10,
          }}
        >
          <TextGeo style={{ fontSize: 15, color: Colors.text }}>
            Thành tiền
          </TextGeo>
          <NumberFormat price={total.toString()} style={{ fontSize: 15 }} />
        </View>
      </Address>

      <View style={styles.total}>
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
              <TextGeo style={{ color: '#fff', fontSize: 16 }}>
                Tiến hành đặt hàng
              </TextGeo>
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
    width: '100%',
    backgroundColor: Colors.lighter_green,
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
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
  },
});

export default PreOrderScreen;
